class AuroraExperience {
    constructor() {
        
        this.sequences = {
            yes: {
                gifs: [
                    { url: "10GVNnqO2ZoAh2", duration: 14000 },
                    { url: "l0MYvHoZeo043Gf9S", duration: 14000 },
                    { url: "pI43YlhMoPqsE", duration: 24000 },
                    { url: "assets/peach_goma_birthday.gif", duration: null }
                ],
                dialogues: [
                    { text: "Each day we thrive to become better...", duration: 4000 },
                    { text: "We build a temple for ourselves,", duration: 5000 },
                    { text: "A temple of perfection that is ourselves.", duration: 4000 },
                    { text: "Perfection, though, is unhappy...", duration: 3000 },
                    { text: "In our universe which is so manipulated,", duration: 3000 },
                    { text: "To the point where our lives are simulated!", duration: 4000 },
                    { text: "Happiness was never about perfection, pity!", duration: 3000 },
                    { text: "We are happy when we're well and together!", duration: 4000 },
                    { text: "And most importantly...", duration: 2000 },
                    { text: "When we have something to live for...", duration: 5000 },
                    { text: "And to love the entire universe,", duration: 3000 },
                    { text: "We must be kind to ourselves.", duration: 7000 },
                    { text: "HAPPY BIRTHDAY!", duration: 10000 }
                ]
            },
            no: {
                gifs: [
                    { url: "TRebCjNbc4dIA", duration: 14000 },
                    { url: "9LZTcawH3mc8V2oUqk", duration: 35000 },
                    { url: "assets/peach_birthday.gif", duration: null }
                ],
                dialogues: [
                    { text: "Many lives this world has witnessed...", duration: 3000 },
                    { text: "We preserve them by remembering their legacies.", duration: 5000 },
                    { text: "What is your legacy?", duration: 3000 },
                    { text: "That which you'll be remembered for?", duration: 4000 },
                    { text: "Here you are today, as perfect as you can get!", duration: 4000 },
                    { text: "And so you live on...", duration: 2000 },
                    { text: "Your legacy is engraved within us to be remembered, forever.", duration: 7000 },
                    { text: "And you're perfect the way you are...", duration: 5000 },
                    { text: "So as the years come and go,...", duration: 3000 },
                    { text: "Never Change!", duration: 5000 },
                    { text: "And HAPPY BIRTHDAY!", duration: 10000 }
                ]
            }
        };
        
        this.gifMetadata = {
            '10GVNnqO2ZoAh2': { width: 287, height: 480 },  // vertical
            'l0MYvHoZeo043Gf9S': { width: 480, height: 480 },  // square
            'pI43YlhMoPqsE': { width: 344, height: 480 },  // vertical
            'TRebCjNbc4dIA': { width: 480, height: 458 },  // almost square
            'assets/peach_birthday.gif': { width: 180, height: 176 },  // horizontal
            'assets/peach_goma_birthday.gif': { width: 260, height: 260 }  // horizontal
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
            isLoading: true,
            isTouching: false
        };

        this.dialogs = [
            "You have collected all the stars",
            "And as a result, an aurora appeared at dawn.",
            "The dancing lights in the sky...",
            "Congratulate you, and wish you a Meowing Birthday!",
            "Make a wish right now!",
            "Now think, do you want to change something this year?"
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
        this.elements.dialogText.textContent = "Collect all the stars";
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
        // Mouse movement handler
        this.elements.container.addEventListener('mousemove', (e) => {
            if (this.state.isMovementLocked || this.state.isLoading || this.state.isTouching) return;
            this.handleMouseMove(e);
        });
    
        // Touch event handlers
        this.elements.container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.state.isTouching = true;
            this.handleTouchMove(e);
        }, { passive: false });

        this.elements.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.state.isTouching) {
                this.handleTouchMove(e);
            }
        }, { passive: false });

        this.elements.container.addEventListener('touchend', () => {
            this.state.isTouching = false;
        });
    
        // Audio
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAllAudio();
            } else {
                this.resumeAudio();
            }
        });
    }
    
    handleTouchMove(e) {
        if (this.state.isLoading || this.state.isMovementLocked) return;

        const touch = e.touches[0];
        const rect = this.elements.container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        this.state.lastMouseX = x;
        this.state.lastMouseY = y;
        
        this.elements.cursor.style.left = `${x}%`;
        this.elements.cursor.style.top = `${y}%`;
        
        if (this.state.phase === 1) {
            this.checkStarCollection(x, y);
        }
    }
    
    setupCursorAnimation() {
        this.elements.container.addEventListener('mousemove', (e) => {
            if (this.state.isMovementLocked || this.state.isLoading || this.state.isTouching) return;
    
            const rect = this.elements.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
    
            this.elements.cursor.style.left = `${x}%`;
            this.elements.cursor.style.top = `${y}%`;
        });
    }
    
    pauseAllAudio() {
        this.activeAudios = []; // Track audios that were playing
    
        Object.values(this.audio).forEach(audio => {
            if (!audio.paused) {
                this.activeAudios.push(audio); // Store playing audios
                audio.pause();
            }
        });
    }
    
    resumeAudio() {
        if (this.activeAudios && this.activeAudios.length > 0) {
            this.activeAudios.forEach(audio => {
                audio.play().catch(console.error);
            });
            this.activeAudios = []; // Clear active audio list after resuming
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

    checkStarCollection() {
        // Get cursor's current position and radius
        const cursorRect = this.elements.cursor.getBoundingClientRect();
        const cursorX = (cursorRect.left + cursorRect.right) / 2; // Center X
        const cursorY = (cursorRect.top + cursorRect.bottom) / 2; // Center Y
        const cursorRadius = cursorRect.width / 2;
    
        // Check for collisions with each star
        this.state.stars.forEach((star) => {
            if (!star.collected) {
                const starRect = star.element.getBoundingClientRect();
                const starX = (starRect.left + starRect.right) / 2; // Star center X
                const starY = (starRect.top + starRect.bottom) / 2; // Star center Y
                const starRadius = starRect.width / 2;
    
                // Calculate distance between cursor and star centers
                const distance = Math.hypot(cursorX - starX, cursorY - starY);
    
                // Trigger collision if distance is within combined radii
                if (distance <= cursorRadius + starRadius) {
                    star.collected = true;
                    star.element.style.display = 'none';
                    this.state.collectedStars++;
    
                    // Update cursor's glow and background brightness based on progress
                    const progress = this.state.collectedStars / this.state.totalStars;
                    this.updateCursorGlow(progress);
                    this.updateBackgroundBrightness(progress);
    
                    // Play 'eat' sound effect
                    this.playEatSound();
    
                    // Check if all stars are collected to transition to the next phase
                    if (this.state.collectedStars === this.state.totalStars) {
                        this.triggerFinalGlow();
                        setTimeout(() => this.startPhase2(), 500);
                    }
                }
            }
        });
    }    

    updateCursorGlow(progress) {
        const maxGlow = 200;
        const currentGlow = 20 + (maxGlow * progress);
        const baseOpacity = 0.8;
        const maxOpacityIncrease = 0.2;
        const currentOpacity = baseOpacity + (maxOpacityIncrease * progress);
    
        this.elements.cursor.style.boxShadow = `
            0 0 ${currentGlow * 0.4}px rgba(255, 255, 255, ${currentOpacity}),
            0 0 ${currentGlow * 0.6}px rgba(255, 255, 255, ${currentOpacity * 0.6}),
            0 0 ${currentGlow}px rgba(255, 255, 255, ${currentOpacity * 0.3})
        `;
    }
    
    updateBackgroundBrightness(progress) {
        // Update the background gradient opacity based on the progress
        this.elements.auroraGradient.style.opacity = progress;
    }
    
    playEatSound() {
        try {
            this.audio.eat.currentTime = 0;
            this.audio.eat.volume = 0.5;
            this.audio.eat.play().catch(console.error);
        } catch (error) {
            console.warn('Error playing eat sound:', error);
        }
    }
    
    triggerFinalGlow() {
        const finalGlow = `
            0 0 ${200 * 0.5}px rgba(255, 255, 255, 1),
            0 0 ${200 * 0.75}px rgba(255, 255, 255, 0.8),
            0 0 ${200}px rgba(255, 255, 255, 0.4)
        `;
        this.elements.cursor.style.boxShadow = finalGlow;
    }    
    
    startPhase2() {
        this.elements.cursor.style.boxShadow = `0 0 0px rgba(255, 255, 255, 0)`;
        this.elements.auroraGradient.style.opacity = 0.0;

        this.state.phase = 2;

        this.state.isMovementLocked = true;
        
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
        this.state.isMovementLocked = true;
        this.elements.cursor.style.display = 'none';
        this.elements.choices.style.display = 'none';
        this.elements.auroraGif.style.opacity = '0';
        this.elements.dialog.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.auroraGif.style.display = 'none';
            this.elements.dialog.style.display = 'none';
        }, 1000);
    
        this.audio.dialog.pause();
        this.audio.theme.loop = true;
        this.audio.theme.volume = 1.0;
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
        
        // Calculate aspect ratios
        const containerAspect = container.clientWidth / container.clientHeight;
        const gifAspect = metadata.width / metadata.height;
        
        // Initialize display properties
        const displayStrategy = {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center center',
            initialTransform: 'scale(0.9)',
            finalTransform: 'scale(0.9)',
            duration: '20s',
            initialPosition: '50% 50%',
            finalPosition: '50% 50%'
        };

        const SCALE_FACTOR = 0.9; // Scale factor for zoom effect
        const PAN_PERCENTAGE = 10; // Percentage of movement for panning

        if (gifAspect > containerAspect) {
            // Landscape GIF in container
            displayStrategy.objectFit = 'cover';
            displayStrategy.height = '100%';
            displayStrategy.initialPosition = '0% 50%';
            displayStrategy.finalPosition = '100% 50%';
            // Add slight zoom for more dynamic effect
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        } else if (gifAspect < containerAspect) {
            // Portrait GIF in container
            displayStrategy.objectFit = 'cover';
            displayStrategy.width = '100%';
            displayStrategy.initialPosition = '50% 0%';
            displayStrategy.finalPosition = '50% 100%';
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        } else {
            // Square or near-square GIF
            displayStrategy.objectFit = 'cover';
            // Add a subtle zoom animation instead of panning
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        }

        return displayStrategy;
    }

    setupGifAnimation(gifElement, strategy) {
        // Reset existing styles and transitions
        gifElement.style.transition = 'none';
        gifElement.style.transform = strategy.initialTransform;
        gifElement.style.objectFit = strategy.objectFit;
        gifElement.style.objectPosition = strategy.initialPosition;
        gifElement.style.width = strategy.width;
        gifElement.style.height = strategy.height;

        // Force browser reflow
        gifElement.offsetHeight;

        // Apply animations - only once
        const transitions = [
            `transform ${strategy.duration} ease-out`,
            `object-position ${strategy.duration} linear`
        ].join(', ');

        setTimeout(() => {
            gifElement.style.transition = transitions;
            gifElement.style.transform = strategy.finalTransform;
            gifElement.style.objectPosition = strategy.finalPosition;
        }, 50);

        // No more event listener for resetting animation
    }

    async playSequence(sequence) {
        let gifIndex = 0;
        let dialogueIndex = 0;

        const playNextGif = async () => {
            if (gifIndex >= sequence.gifs.length) return;

            const gif = sequence.gifs[gifIndex];
            this.elements.phase4Gif.style.opacity = '0';
            
            // Wait for fade out
            if (gifIndex > 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            // Calculate display strategy before loading new GIF
            const displayStrategy = this.calculateGifDisplay(gif.url);
            
            // Update GIF styles
            Object.assign(this.elements.phase4Gif.style, {
                display: 'block',
                opacity: '0',
                position: 'absolute',
                inset: '0',
                width: displayStrategy.width,
                height: displayStrategy.height,
                objectFit: displayStrategy.objectFit
            });
            
            // Check if the URL is local or remote
            if (gif.url.startsWith("assets/")) {
                // Local path
                this.elements.phase4Gif.src = gif.url;
            } else {
                // Remote path from Giphy
                this.elements.phase4Gif.src = `https://media.giphy.com/media/${gif.url}/giphy.gif`;
            }
            // Wait for the GIF to load
            await new Promise((resolve) => {
                this.elements.phase4Gif.onload = resolve;
            });

            // Setup animation (now without looping) and fade in
            this.setupGifAnimation(this.elements.phase4Gif, displayStrategy);
            this.elements.phase4Gif.style.opacity = '1';

            if (gif.duration !== null) {
                setTimeout(() => {
                    this.elements.phase4Gif.style.opacity = '0';
                    setTimeout(() => {
                        gifIndex++;
                        playNextGif();
                    }, 600);
                }, gif.duration - 500);
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
        this.elements.cursor.style.boxShadow = `0 0 25px rgba(255, 255, 255, 1)`
        this.state.phase = 3;
        this.elements.choices.style.display = 'block';
        this.state.isMovementLocked = false;
        this.elements.cursor.style.opacity = '1.0';
        
        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Yes';
        yesBtn.className = 'choice-btn';
        yesBtn.id = 'yes-btn';
        yesBtn.onclick = () => this.startPhase4('yes');
        yesBtn.addEventListener('touchstart', () => this.startPhase4('yes')); // Add touch support
    
        const noBtn = document.createElement('button');
        noBtn.textContent = 'No';
        noBtn.className = 'choice-btn';
        noBtn.id = 'no-btn';
        noBtn.onclick = () => this.startPhase4('no');
        noBtn.addEventListener('touchstart', () => this.startPhase4('no')); // Add touch support
        
        this.elements.choices.innerHTML = '';
        this.elements.choices.appendChild(yesBtn);
        this.elements.choices.appendChild(noBtn);
    }    
}

document.addEventListener('DOMContentLoaded', () => {
    new AuroraExperience();
});