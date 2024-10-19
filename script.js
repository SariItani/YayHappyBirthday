class AuroraExperience {
    constructor() {
        
        this.sequences = {
            yes: {
                gifs: [
                    { url: "10GVNnqO2ZoAh2", duration: 12000 },
                    { url: "l0MYvHoZeo043Gf9S", duration: 14000 },
                    { url: "pI43YlhMoPqsE", duration: null }
                ],
                dialogues: [
                    { text: "Each day we thrive to become better...", duration: 4000 },
                    { text: "We are building a temple for ourselves", duration: 3000 },
                    { text: "A temple of perfections that is ourselves.", duration: 4000 },
                    { text: "Perfection though is unhappy!", duration: 3000 },
                    { text: "In our universe which is manipulated", duration: 3000 },
                    { text: "to the point where our lives are simulated...", duration: 4000 },
                    { text: "Happiness was never about perfection, pity!", duration: 3000 },
                    { text: "We are happy when we're well and together", duration: 4000 },
                    { text: "and most importantly...", duration: 2000 },
                    { text: "having something to live for", duration: 5000 },
                    { text: "and to love the entire universe", duration: 3000 },
                    { text: "we love and are kind to ourselves", duration: 7000 }
                ]
            },
            no: {
                gifs: [
                    { url: "TRebCjNbc4dIA", duration: 14000 },
                    { url: "9LZTcawH3mc8V2oUqk", duration: null }
                ],
                dialogues: [
                    { text: "Many lives this world has witnessed", duration: 3000 },
                    { text: "We preserve them by remembering their legacies", duration: 5000 },
                    { text: "What is your legacy", duration: 3000 },
                    { text: "That which you will be remembered for?", duration: 4000 },
                    { text: "Here you are today, as perfect as you can get", duration: 4000 },
                    { text: "And so you live on...", duration: 2000 },
                    { text: "Your legacy is engraved within us to remember forever.", duration: 6000 }
                ]
            }
        };
        
        this.gifMetadata = {
            '10GVNnqO2ZoAh2': { width: 287, height: 480 },  // vertical
            'l0MYvHoZeo043Gf9S': { width: 480, height: 480 },  // square
            'pI43YlhMoPqsE': { width: 344, height: 480 },  // vertical
            'TRebCjNbc4dIA': { width: 480, height: 458 },  // almost square
            '9LZTcawH3mc8V2oUqk': { width: 480, height: 336 }  // horizontal
        };
        
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
            eat: new Audio('eat-sound.mp3'),
            theme: new Audio('theme.mp3')
        };

        // State management
        this.state = {
            phase: 1,
            stars: [],
            collectedStars: 0,
            totalStars: 30,
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
        this.elements.dialog.style.display = 'block';
        this.elements.dialogText.textContent = "Collect all stars";
        this.elements.dialogText.style.opacity = '1';

        setTimeout(() => {
            this.elements.dialogText.style.opacity = '0';
            setTimeout(() => {
                this.elements.dialog.style.display = 'none';
            }, 500);
        }, 800);

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
        this.elements.container.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    
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
            this.showLoadingScreen();
    
            const startBtn = document.getElementById('start-btn');
            startBtn.addEventListener('click', async () => {
                startBtn.style.display = 'none';

                await this.preloadAssets();

                this.generateStars();
                this.setupEventListeners();
                this.setupCursorAnimation();
                this.hideLoadingScreen();
                this.startBackgroundMusic();
            });
        } catch (error) {
            console.error('Initialization error:', error);
            this.handleError('Failed to initialize experience');
        }
    }
    
    handleError(message) {
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
            throw error;
        }
    }

    generateStars() {
        const STAR_SIZE = 7;
        const starSizePercent = (STAR_SIZE / this.elements.container.clientWidth) * 100;
        
        for (let i = 0; i < this.state.totalStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
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
    
                if (distance < 1.8) {
                    star.collected = true;
                    star.element.style.display = 'none';
                    this.state.collectedStars++;
    
                    const auraStrength = Math.min(this.state.collectedStars / this.state.totalStars, 1);
                    const baseRadius = 20;
                    const maxRadiusIncrease = 160;
                    const baseOpacity = 0.5;
                    const maxOpacityIncrease = 1.0;
    
                    this.elements.cursor.style.boxShadow = `0 0 ${baseRadius + auraStrength * maxRadiusIncrease}px rgba(255, 255, 255, ${baseOpacity + auraStrength * maxOpacityIncrease})`;
                    this.elements.auroraGradient.style.opacity = (this.state.collectedStars / this.state.totalStars) * 1.0;
    
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
        this.elements.cursor.style.boxShadow = `0 0 0px rgba(255, 255, 255, 0)`;
        this.elements.auroraGradient.style.opacity = 0.0;

        this.state.phase = 2;
        
        const currentX = parseFloat(this.elements.cursor.style.left);
        const currentY = parseFloat(this.elements.cursor.style.top);
        const targetX = 50;
        const targetY = 50;
        
        const animateCursor = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const duration = 2000;
            const steps = 60;
            let step = 0;
            
            const animation = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
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

        animateCursor();
    }

    completePhase2Transition() {
        this.state.isMovementLocked = true;
        
        this.audio.background.pause();
        this.audio.dialog.loop = true;
        this.audio.dialog.volume = 1.0;
        this.audio.dialog.play().catch(console.error);

        this.elements.auroraGradient.style.display = 'none';
        this.elements.auroraGif.style.display = 'block';
        setTimeout(() => {
            this.elements.auroraGif.style.opacity = '1';
        }, 100);

        this.elements.cursor.style.opacity = '0.35';

        this.state.stars.forEach(star => star.element.remove());
        
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

    startPhase4(choice) {
        this.state.phase = 4;
        
        this.elements.choices.style.display = 'none';
        this.elements.auroraGif.style.opacity = '0';
        this.elements.dialog.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.auroraGif.style.display = 'none';
            this.elements.dialog.style.display = 'none';
        }, 1000);
    
        this.audio.dialog.pause();
        this.audio.theme.loop = true;
        this.audio.theme.volume = 0.7;
        this.audio.theme.play().catch(console.error);
    
        if (!this.elements.phase4Dialog) {
            this.elements.phase4Dialog = document.createElement('div');
            this.elements.phase4Dialog.id = 'phase4-dialog';
            this.elements.container.appendChild(this.elements.phase4Dialog);
            
            this.elements.phase4Gif = document.createElement('img');
            this.elements.phase4Gif.id = 'phase4-gif';
            this.elements.container.appendChild(this.elements.phase4Gif);
        }
    
        this.playSequence(this.sequences[choice]);
    }
    
    calculateGifDisplay(gifId) {
        const metadata = this.gifMetadata[gifId];
        const container = this.elements.container;
        
        const containerAspect = container.clientWidth / container.clientHeight; // Screen aspect ratio
        const gifAspect = metadata.width / metadata.height; // GIF aspect ratio
        
        let fitStrategy = {
            objectFit: 'cover',  // Always cover to fill the screen
            animationDirection: null,  // Animation direction: horizontal or vertical
            initialPosition: '50%',
            finalPosition: '50%'
        };
    
        // If GIF is wider than the container (landscape)
        if (gifAspect > containerAspect) {
            // Fit by height, and animate horizontally (pan left to right)
            fitStrategy.animationDirection = 'horizontal';
            fitStrategy.initialPosition = '0%'; // Start from the left
            fitStrategy.finalPosition = '100%'; // Pan to the right
        } 
        // If GIF is taller than the container (portrait)
        else if (gifAspect < containerAspect) {
            // Fit by width, and animate vertically (pan top to bottom)
            fitStrategy.animationDirection = 'vertical';
            fitStrategy.initialPosition = '0%'; // Start from the top
            fitStrategy.finalPosition = '100%'; // Pan to the bottom
        }
    
        return fitStrategy;
    }
    
    setupGifAnimation(gifElement, strategy) {
        // Reset any existing animations and styles
        gifElement.style.transition = 'none';
        gifElement.style.transform = 'none';
        
        // Always use object-fit: cover to ensure the GIF fills the screen appropriately
        gifElement.style.objectFit = strategy.objectFit;
        
        // Set initial position for the animation
        if (strategy.animationDirection === 'horizontal') {
            gifElement.style.objectPosition = `${strategy.initialPosition} 50%`; // Pan horizontally
        } else if (strategy.animationDirection === 'vertical') {
            gifElement.style.objectPosition = `50% ${strategy.initialPosition}`; // Pan vertically
        } else {
            gifElement.style.objectPosition = '50% 50%'; // No animation needed if GIF fits perfectly
        }
    
        // Start animation after a short delay to allow for smooth transition
        setTimeout(() => {
            gifElement.style.transition = 'object-position 20s linear'; // Control speed of the panning
            if (strategy.animationDirection === 'horizontal') {
                gifElement.style.objectPosition = `${strategy.finalPosition} 50%`; // Pan to right
            } else if (strategy.animationDirection === 'vertical') {
                gifElement.style.objectPosition = `50% ${strategy.finalPosition}`; // Pan to bottom
            }
        }, 100); // Start animation after a short delay
    }
    
    async playSequence(sequence) {
        let gifIndex = 0;
        let dialogueIndex = 0;

        const playNextGif = async () => {
            if (gifIndex >= sequence.gifs.length) return;

            const gif = sequence.gifs[gifIndex];
            this.elements.phase4Gif.style.opacity = '0';
            
            // Calculate display strategy before loading new GIF
            const displayStrategy = this.calculateGifDisplay(gif.url);
            
            // Configure GIF element
            this.elements.phase4Gif.style.objectFit = displayStrategy.objectFit;
            this.elements.phase4Gif.src = `https://media.giphy.com/media/${gif.url}/giphy.gif`;
            this.elements.phase4Gif.style.display = 'block';
            
            // Wait for GIF to load
            await new Promise((resolve) => {
                this.elements.phase4Gif.onload = resolve;
            });

            // Setup animation and fade in
            this.setupGifAnimation(this.elements.phase4Gif, displayStrategy);
            this.elements.phase4Gif.style.opacity = '1';

            if (gif.duration !== null) {
                setTimeout(() => {
                    this.elements.phase4Gif.style.opacity = '0';
                    setTimeout(() => {
                        gifIndex++;
                        playNextGif();
                    }, 1000);
                }, gif.duration - 1000);
            }
        };
    
        const playNextDialogue = async () => {
            if (dialogueIndex >= sequence.dialogues.length) return;
    
            const dialogue = sequence.dialogues[dialogueIndex];
            
            this.elements.phase4Dialog.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.elements.phase4Dialog.textContent = dialogue.text;
            this.elements.phase4Dialog.style.opacity = '1';
    
            setTimeout(() => {
                this.elements.phase4Dialog.style.opacity = '0';
                setTimeout(() => {
                    dialogueIndex++;
                    playNextDialogue();
                }, 500);
            }, dialogue.duration - 500);
        };
    
        playNextGif();
        playNextDialogue();
    }
    
    startPhase3() {
        this.state.phase = 3;
        this.elements.choices.style.display = 'block';
        this.state.isMovementLocked = false;
        this.elements.cursor.style.opacity = '1.0';
    
        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Yes';
        yesBtn.className = 'choice-btn';
        yesBtn.id = 'yes-btn';
        yesBtn.onclick = () => this.startPhase4('yes');
    
        const noBtn = document.createElement('button');
        noBtn.textContent = 'No';
        noBtn.className = 'choice-btn';
        noBtn.id = 'no-btn';
        noBtn.onclick = () => this.startPhase4('no');
    
        this.elements.choices.innerHTML = '';
        this.elements.choices.appendChild(yesBtn);
        this.elements.choices.appendChild(noBtn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AuroraExperience();
});