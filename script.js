class AuroraExperience {
    constructor() {
        // Store DOM references
        this.elements = {
            container: document.getElementById('container'),
            auroraGradient: document.getElementById('aurora-gradient'),
            auroraGif: document.getElementById('aurora-gif'),
            cursor: document.getElementById('cursor'),
            dialog: document.getElementById('dialog'),
            dialogText: document.getElementById('dialog-text'),
            choices: document.getElementById('choices'),
            loadingScreen: document.getElementById('loading-screen'),
            progressBar: document.getElementById('loading-progress')
        };

        // Audio elements with preload
        this.audio = {
            background: new Audio('background-music.mp3'),
            dialog: new Audio('dialog-music.mp3'),
            eat: new Audio('eat-sound.mp3')
        };

        // State management
        this.state = {
            phase: 1,
            stars: [],
            collectedStars: 0,
            totalStars: 15,
            currentDialog: 0,
            isMovementLocked: false,
            lastMouseX: 0,
            lastMouseY: 0,
            isLoading: true
        };

        this.dialogs = [
            "Like what you see?",
            "This is an aurora, it occurs during dawn",
            "The dancing lights in the sky...",
            "What do you think about watching this together someday?"
        ];

        // Initialize after setup
        this.init();
    }

    showLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.display = 'flex';
            this.elements.loadingScreen.style.opacity = '1';
        }
    }

    hideLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                this.elements.loadingScreen.style.display = 'none';
                this.state.isLoading = false;
            }, 500);
        }
    }

    updateLoadingProgress(progress) {
        if (this.elements.progressBar) {
            this.elements.progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
        }
    }

    handleMouseMove(e) {
        if (this.state.isLoading || this.state.isMovementLocked) return;

        const rect = this.elements.container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        this.state.lastMouseX = x;
        this.state.lastMouseY = y;
        
        if (this.state.phase === 1) {
            this.checkStarCollection(x, y);
        }
    }


    setupEventListeners() {
        // Throttled mousemove handler
        let ticking = false;
        this.elements.container.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleMouseMove(e);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAllAudio();
            } else {
                this.resumeAudio();
            }
        });
    }

    setupCursorAnimation() {
        this.elements.container.addEventListener('mousemove', (e) => {
            if (this.state.isMovementLocked || this.state.isLoading) return;
    
            const rect = this.elements.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
    
            this.elements.cursor.style.left = `${x}%`;
            this.elements.cursor.style.top = `${y}%`;
        });
    }
    
    pauseAllAudio() {
        Object.values(this.audio).forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }

    resumeAudio() {
        if (this.state.phase === 1) {
            this.audio.background.play().catch(console.error);
        } else if (this.state.phase === 2) {
            this.audio.dialog.play().catch(console.error);
        }
    }

    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Load all assets
            await this.preloadAssets();
            
            // Initialize components
            this.generateStars();
            this.setupEventListeners();
            this.setupCursorAnimation();
            
            // Hide loading screen and start experience
            this.hideLoadingScreen();
            this.startBackgroundMusic();
        } catch (error) {
            console.error('Initialization error:', error);
            this.handleError('Failed to initialize experience');
        }
    }

    handleError(message) {
        // Add error handling UI if needed
        console.error(message);
        this.elements.loadingScreen.innerHTML = `
            <div class="loading-content">
                <h2>Error Loading Experience</h2>
                <p>${message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }

    async preloadAssets() {
        const totalAssets = Object.keys(this.audio).length + 1; // +1 for aurora.gif
        let loadedAssets = 0;

        try {
            const loadPromises = [
                // Preload aurora gif
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedAssets++;
                        this.updateLoadingProgress(loadedAssets / totalAssets);
                        resolve();
                    };
                    img.onerror = () => reject(new Error('Failed to load aurora.gif'));
                    img.src = 'aurora.gif';
                }),
                
                // Preload audio files
                ...Object.entries(this.audio).map(([key, audio]) => new Promise((resolve, reject) => {
                    audio.addEventListener('canplaythrough', () => {
                        loadedAssets++;
                        this.updateLoadingProgress(loadedAssets / totalAssets);
                        resolve();
                    }, { once: true });
                    audio.addEventListener('error', () => reject(new Error(`Failed to load ${key} audio`)), { once: true });
                    audio.load();
                }))
            ];

            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Asset loading error:', error);
            this.handleError('Failed to load necessary assets. Please refresh the page.');
            throw error; // This will prevent the experience from starting
        }
    }

    generateStars() {
        const STAR_SIZE = 4; // Size in pixels
        const starSizePercent = (STAR_SIZE / this.elements.container.clientWidth) * 100;
        
        for (let i = 0; i < this.state.totalStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Calculate bounds considering star size
            const x = Math.random() * (100 - starSizePercent);
            const y = Math.random() * (100 - starSizePercent);
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            
            this.elements.container.appendChild(star);
            this.state.stars.push({
                element: star,
                collected: false,
                x,
                y
            });
        }
    }

    startBackgroundMusic() {
        try {
            this.audio.background.loop = true;
            this.audio.background.volume = 0.5;
            const playPromise = this.audio.background.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn('Audio autoplay was prevented:', error);
                    // Instead of showing a button, we'll handle this during asset loading
                    throw new Error('Audio playback not allowed');
                });
            }
        } catch (error) {
            console.error('Error playing background music:', error);
            throw error;
        }
    }

    checkStarCollection(x, y) {
        this.state.stars.forEach((star, index) => {
            if (!star.collected) {
                const distance = Math.hypot(x - star.x, y - star.y);

                if (distance < 2) {
                    star.collected = true;
                    star.element.style.display = 'none';
                    this.state.collectedStars++;

                    // Adjusted aura values for better visibility
                    const auraStrength = Math.min(this.state.collectedStars / this.state.totalStars, 1);
                    const baseRadius = 20; // Smaller base radius
                    const maxRadiusIncrease = 40; // Smaller maximum increase
                    const baseOpacity = 0.8; // Higher base opacity
                    const maxOpacityIncrease = 0.2; // Smaller opacity increase
                    
                    this.elements.cursor.style.boxShadow = `0 0 ${baseRadius + auraStrength * maxRadiusIncrease}px rgba(255, 255, 255, ${baseOpacity + auraStrength * maxOpacityIncrease})`;
                    this.elements.auroraGradient.style.opacity = (this.state.collectedStars / this.state.totalStars) * 0.8;

                    try {
                        this.audio.eat.currentTime = 0;
                        this.audio.eat.play().catch(console.error);
                    } catch (error) {
                        console.warn('Error playing eat sound:', error);
                    }

                    if (this.state.collectedStars === this.state.totalStars) {
                        setTimeout(() => this.startPhase2(), 500);
                    }
                }
            }
        });
    }

    startPhase2() {
        this.state.phase = 2;
        
        // Animate cursor to center before locking movement
        const currentX = parseFloat(this.elements.cursor.style.left);
        const currentY = parseFloat(this.elements.cursor.style.top);
        const targetX = 50;
        const targetY = 50;
        
        // Animate cursor movement
        const animateCursor = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const duration = 1000; // 1 second
            const steps = 60; // 60 frames
            let step = 0;
            
            const animation = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
                
                const newX = currentX + dx * easeProgress;
                const newY = currentY + dy * easeProgress;
                
                this.elements.cursor.style.left = `${newX}%`;
                this.elements.cursor.style.top = `${newY}%`;
                
                if (step >= steps) {
                    clearInterval(animation);
                    this.completePhase2Transition();
                }
            }, duration / steps);
        };

        // Start the animation
        animateCursor();
    }

    completePhase2Transition() {
        this.state.isMovementLocked = true;
        
        // Switch music
        this.audio.background.pause();
        this.audio.dialog.loop = true;
        this.audio.dialog.volume = 0.5;
        this.audio.dialog.play().catch(console.error);

        // Visual transitions
        this.elements.auroraGradient.style.display = 'none';
        this.elements.auroraGif.style.display = 'block';
        setTimeout(() => {
            this.elements.auroraGif.style.opacity = '1';
        }, 100);

        this.elements.cursor.style.opacity = '0.2';

        // Clean up stars
        this.state.stars.forEach(star => star.element.remove());
        
        // Show dialog
        this.elements.dialog.style.display = 'block';
        this.showDialogs();
    }


    showDialogs() {
        const showNextDialog = () => {
            if (this.state.currentDialog < this.dialogs.length - 1) {
                this.fadeDialog(this.dialogs[this.state.currentDialog], () => {
                    this.state.currentDialog++;
                    setTimeout(showNextDialog, 3000);
                });
            } else {
                this.fadeDialog(this.dialogs[this.state.currentDialog], () => {
                    this.startPhase3();
                });
            }
        };
        showNextDialog();
    }

    fadeDialog(text, callback) {
        this.elements.dialogText.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.dialogText.textContent = text;
            this.elements.dialogText.style.opacity = '1';
            if (callback) setTimeout(callback, 2000);
        }, 500);
    }

    startPhase3() {
        this.state.phase = 3;
        this.elements.choices.style.display = 'block';
        this.state.isMovementLocked = false;
        this.elements.cursor.style.opacity = '1.0';
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuroraExperience();
});