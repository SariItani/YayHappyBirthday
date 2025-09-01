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
                    { url: "9LZTcawH3mc8V2oUqk", duration: 32000 },
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
        this.assets = {
            audio: {
                'background-music': 'background-music.mp3',
                'dialog-music': 'dialog-music.mp3',
                'eat-sound': 'eat-sound.mp3',
                'theme': 'theme.mp3',
                'fight': 'fight.mp3',
                'enemy-hit': 'enemy-hit.mp3'
            },
            images: {
                'aurora': 'aurora.gif',
                'peach-birthday': 'assets/peach_birthday.gif',
                'peach-goma-birthday': 'assets/peach_goma_birthday.gif'
            },
            giphy: [
                '10GVNnqO2ZoAh2',
                'l0MYvHoZeo043Gf9S',
                'pI43YlhMoPqsE',
                'TRebCjNbc4dIA',
                '9LZTcawH3mc8V2oUqk'
            ]
        };
        this.gifMetadata = {
            '10GVNnqO2ZoAh2': { width: 287, height: 480 },
            'l0MYvHoZeo043Gf9S': { width: 480, height: 480 },
            'pI43YlhMoPqsE': { width: 344, height: 480 },
            'TRebCjNbc4dIA': { width: 480, height: 458 },
            '9LZTcawH3mc8V2oUqk': { width: 480, height: 336 },
            'assets/peach_birthday.gif': { width: 180, height: 176 },
            'assets/peach_goma_birthday.gif': { width: 320, height: 320 }
        };
        this.elements = {
            container: document.getElementById('container'),
            auroraGradient: document.getElementById('aurora-gradient'),
            auroraGif: document.getElementById('aurora-gif'),
            cursor: document.getElementById('cursor'),
            dialog: document.getElementById('dialog'),
            dialogText: document.getElementById('dialog-text'),
            choices: document.getElementById('choices'),
            loadingScreen: document.getElementById('loading-screen'),
            progressBar: document.getElementById('loading-progress'),
            phase4Gif: document.getElementById('phase4-gif'),
            phase4Dialog: document.getElementById('phase4-dialog'),
            healthBar: document.getElementById('health-bar')
        };
        this.audio = {
            background: new Audio('background-music.mp3'),
            dialog: new Audio('dialog-music.mp3'),
            eat: new Audio('eat-sound.mp3'),
            theme: new Audio('theme.mp3'),
            fight: new Audio('fight.mp3'),
            enemyHit: new Audio('enemy-hit.mp3')
        };
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
            isTouching: false,
            health: 3,
            maxHealth: 3,
            enemies: [],
            auraActive: false,
            auraEl: null,
            phaseTimer: null,
            lastAuraX: 50,
            lastAuraY: 50,
            auraVelocityX: 0,
            auraVelocityY: 0
        };
        this.interludes = {
            afterPhase1: [
                "The sky tightens. A mood you can feel, not name.",
                "Something out there resents your inner light.",
                "Stay centered. Be ready."
            ],
            afterPhase2: [
                "Not every shadow is yours to fight.",
                "They throw stones and call them truths.",
                "Stay strong. Breathe. Continue your journey anyway."
            ]
        };
        this.dialogues = {
            interlude1: [
                "The sky tightens. A mood you can feel, not name.",
                "Something out there resents your inner light.",
                "Stay centered. Be ready."
            ],
            phase2: [
                "Not every shadow is yours to fight.",
                "They throw stones and call them truths.",
                "Stay strong. Breathe. Continue your journey anyway."
            ],
            interlude2: [
                "Some don't just doubt you, they need you boxed.",
                "They feed on your loss and call it honesty.",
                "You're going to outgrow their script!"
            ],
            phase3: [
                "They chase, not because you're wrong, but because you're aloft.",
                "You don't owe anyone your stillness.",
                "Keep your shape. Keep your form. Stay steady."
            ],
            phase4: [
                "You were never meant to carry it alone.",
                "Let kindness orbit you, a quiet gravity.",
                "Even the loudest doubt is negligible when you're true with yourself.",
                "Don't erase the world. Transform how it reaches you."
            ],
            ending: [
                "You are whole. You are enough.",
                "Loved is a place you can live.",
                "Happy Birthday!! ✨"
            ]
        };

        this.dialogs = [
            "You have collected all the stars",
            "And as a result, an aurora appeared at dawn.",
            "The dancing lights in the sky...",
            "Congratulate you, and wish you a Meowing Birthday!",
            "Make a wish right now!",
            "Now think, do you want to change something this year?"
        ];

        this.init();
    }

    showLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.display = 'flex';
            this.elements.loadingScreen.style.opacity = '1';
        }
    }

    hideLoadingScreen() {
        if (this.elements.dialog) {
            this.elements.dialog.style.display = 'block';
            this.elements.dialogText.textContent = "Collect all the stars";
            this.elements.dialogText.style.opacity = '1';
            setTimeout(() => {
                this.elements.dialogText.style.opacity = '0';
                setTimeout(() => {
                    this.elements.dialog.style.display = 'none';
                }, 500);
            }, 800);
        }

        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                this.elements.loadingScreen.style.display = 'none';
                this.state.isLoading = false;
            }, 500);
        }
    }

    async showDialogSequence(lines, duration = 3000) {
        // Guard
        if (!Array.isArray(lines) || lines.length === 0) return Promise.resolve();

        // Use the existing showPhase4Dialog (it returns a Promise and fades the text)
        for (let i = 0; i < lines.length; i++) {
            const text = lines[i];
            // await each dialog line to finish before showing the next
            await this.showPhase4Dialog(text, duration);
        }
    }

    updateLoadingProgress(progress) {
        if (this.elements.progressBar) {
            const targetWidth = Math.min(progress * 100, 100);
            this.elements.progressBar.style.transition = 'width 0.3s ease';
            this.elements.progressBar.style.width = `${targetWidth}%`;
        }
    }

    handleMouseMove(e) {
        if (this.state.isLoading || this.state.isMovementLocked) return;
        const rect = this.elements.container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.state.lastMouseX = x;
        this.state.lastMouseY = y;
        if (this.state.phase === 1 || this.state.phase === 2 || this.state.phase === 3 || this.state.phase === 4) {
            this.checkStarCollection();
        }
        if (this.state.phase === 2 || this.state.phase === 3) {
            this.checkEnemyCollisions();
        }
        if (this.state.auraEl) {
            const now = Date.now();
            if (!this.state.lastAuraUpdate) this.state.lastAuraUpdate = now;
            const dt = (now - this.state.lastAuraUpdate) / 1000;
            this.state.lastAuraUpdate = now;
            
            if (dt > 0) {
                this.state.auraVelocityX = (x - this.state.lastAuraX) / dt;
                this.state.auraVelocityY = (y - this.state.lastAuraY) / dt;
            }
            
            this.state.lastAuraX = x;
            this.state.lastAuraY = y;
            this.state.auraEl.style.left = `${x}%`;
            this.state.auraEl.style.top = `${y}%`;
            
            // Increase the distortion effect by adjusting these parameters
            const speed = Math.sqrt(
                this.state.auraVelocityX * this.state.auraVelocityX + 
                this.state.auraVelocityY * this.state.auraVelocityY
            );
            
            const maxDistortion = 1.0; // Increased from 0.5
            const distortion = Math.min(speed / 50, maxDistortion); // Changed denominator from 100 to 50
            
            if (speed > 5) { // Lowered threshold from 10 to 5
                const angle = Math.atan2(this.state.auraVelocityY, this.state.auraVelocityX);
                const scaleX = 1 + distortion;
                const scaleY = 1 - distortion * 0.7; // Increased from 0.5 to 0.7
                
                this.state.auraEl.style.transform = `
                    rotate(${angle}rad) 
                    scaleX(${scaleX}) 
                    scaleY(${scaleY})
                `;
            } else {
                this.state.auraEl.style.transform = 'scale(1)';
            }
        }
    }

    playMusic(key, { loop = true, volume = 1.0, fadeOutOthers = true } = {}) {
        try {
            if (!this.audio[key]) return;
            if (fadeOutOthers) {
                Object.entries(this.audio).forEach(([k, a]) => {
                    if (a && !a.paused && k !== key) {
                        // quick fade out
                        const iv = setInterval(() => {
                            a.volume = Math.max(0, a.volume - 0.1);
                            if (a.volume <= 0.05) {
                                clearInterval(iv);
                                a.pause();
                                a.currentTime = 0;
                            }
                        }, 80);
                    }
                });
            }
            const track = this.audio[key];
            track.currentTime = 0;
            track.loop = loop;
            track.volume = 0;
            const p = track.play();
            if (p) p.catch(console.error);
            // fade in
            const ivIn = setInterval(() => {
                track.volume = Math.min(volume, track.volume + 0.1);
                if (track.volume >= volume) clearInterval(ivIn);
            }, 120);
        } catch (e) {
            console.warn('playMusic error:', e);
        }
    }

    setupEventListeners() {
        this.elements.container.addEventListener('mousemove', (e) => {
            if (this.state.isMovementLocked || this.state.isLoading || this.state.isTouching) return;
            this.handleMouseMove(e);
        });
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
        if (this.state.phase === 1 || this.state.phase === 2 || this.state.phase === 3 || this.state.phase === 4) {
            this.checkStarCollection();
        }
        if (this.state.phase === 2 || this.state.phase === 3) {
            this.checkEnemyCollisions();
        }
        if (this.state.auraEl) {
            this.state.auraEl.style.left = `${x}%`;
            this.state.auraEl.style.top = `${y}%`;
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
        this.activeAudios = [];
        Object.values(this.audio).forEach(audio => {
            if (audio && !audio.paused) {
                this.activeAudios.push(audio);
                audio.pause();
            }
        });
    }

    resumeAudio() {
        if (this.activeAudios && this.activeAudios.length > 0) {
            this.activeAudios.forEach(audio => {
                audio.play().catch(console.error);
            });
            this.activeAudios = [];
        }
    }

    async preloadAssets() {
        const totalAssets = Object.keys(this.assets.audio).length +
                           Object.keys(this.assets.images).length +
                           this.assets.giphy.length;
        let loadedAssets = 0;
        try {
            const loadingPromises = [];
            Object.entries(this.assets.audio).forEach(([key, path]) => {
                const p = new Promise((resolve, reject) => {
                    const audio = new Audio();
                    audio.addEventListener('canplaythrough', () => {
                        loadedAssets++;
                        this.updateLoadingProgress(loadedAssets / totalAssets);
                        this.audio[key] = audio;
                        resolve();
                    }, { once: true });
                    audio.addEventListener('error', () => reject(new Error(`Failed to load audio: ${path}`)), { once: true });
                    audio.src = path;
                    audio.load();
                });
                loadingPromises.push(p);
            });
            Object.entries(this.assets.images).forEach(([key, path]) => {
                const p = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => { loadedAssets++; this.updateLoadingProgress(loadedAssets / totalAssets); resolve(); };
                    img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
                    img.src = path;
                });
                loadingPromises.push(p);
            });
            this.assets.giphy.forEach(giphyId => {
                const p = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => { loadedAssets++; this.updateLoadingProgress(loadedAssets / totalAssets); resolve(); };
                    img.onerror = () => reject(new Error(`Failed to load Giphy GIF: ${giphyId}`));
                    img.src = `https://media.giphy.com/media/${giphyId}/giphy.gif`;
                });
                loadingPromises.push(p);
            });
            this.updateLoadingProgress(0);
            await Promise.all(loadingPromises);
            this.updateLoadingProgress(1);

        } catch (error) {
            console.error('Asset loading error:', error);
            this.handleError('Failed to load necessary assets. Please check your connection and refresh the page.');
            throw error;
        }
    }

    generateStars() {
        const STAR_SIZE = 7;
        const starSizePercent = (STAR_SIZE / this.elements.container.clientWidth) * 100;
        const starCount = this.state.totalStars || 30;
        for (let i = 0; i < starCount; i++) {
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
            if (!this.audio.background) return;
            this.audio.background.loop = true;
            this.audio.background.volume = 0.5;
            const playPromise = this.audio.background.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn('Audio autoplay was prevented:', error);
                });
            }
        } catch (error) {
            console.error('Error playing background music:', error);
        }
    }

    checkStarCollection() {
        const cursorRect = this.elements.cursor.getBoundingClientRect();
        const cursorX = (cursorRect.left + cursorRect.right) / 2;
        const cursorY = (cursorRect.top + cursorRect.bottom) / 2;
        const cursorRadius = cursorRect.width / 2;
        this.state.stars.forEach((star) => {
            if (!star.collected) {
                const starRect = star.element.getBoundingClientRect();
                const starX = (starRect.left + starRect.right) / 2;
                const starY = (starRect.top + starRect.bottom) / 2;
                const starRadius = starRect.width / 2;
                const distance = Math.hypot(cursorX - starX, cursorY - starY);
                if (distance <= cursorRadius + starRadius) {
                    star.collected = true;
                    star.element.style.display = 'none';
                    this.state.collectedStars++;
                    const progress = this.state.collectedStars / this.state.totalStars;
                    this.updateCursorGlow(progress);
                    this.updateBackgroundBrightness(progress);
                    this.playEatSound();
                    if (this.state.collectedStars === this.state.totalStars) {
                        this.triggerFinalGlow();
                        if (this.state.phase === 1) {
                            setTimeout(() => this.startPhase2(), 500);
                        } else if (this.state.phase === 2) {
                            this.state.isMovementLocked = true;
                            this.elements.cursor.style.opacity = 0.35;

                            // start the Phase 3 transition animation immediately (cursor moves),
                            // clear enemies and dim health bar while interlude text plays
                            this.startPhase3();
                            this.clearEnemies();
                            this.updateHealthBarVisibility(false);

                            // Show the Phase-2 interlude lines, then start phase3 gameplay
                            this.showDialogSequence(this.dialogues.interlude2, 2500)
                                .then(() => { this.startPhase3Gameplay(); })
                                .catch((e) => { console.error(e); this.startPhase3Gameplay(); 
                            });
                        } else if (this.state.phase === 3) {
                            this.state.isMovementLocked = true;
                            this.elements.cursor.style.opacity = 0.35;
                            this.clearEnemies();
                            this.updateHealthBarVisibility(false);

                            // Show Phase-3 interlude/dialog lines, then animate the cursor to center and begin Phase 4
                            this.showDialogSequence(this.dialogues.phase3, 2500)
                                .then(() => {
                                    return this.animateCursorToCenter();
                                })
                                .then(() => {
                                    this.completePhase3Transition();
                                    this.startPhase4();
                                })
                                .catch((e) => {
                                    console.error(e);
                                    // fallback: still do the transition
                                    this.animateCursorToCenter().then(() => {
                                        this.completePhase3Transition();
                                        this.startPhase4();
                                    });
                                });
                        } else if (this.state.phase === 4) {
                            setTimeout(() => this.handleFinalVictory(), 500);
                        }
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
        // For Phase 4, use the gradient with controlled opacity
        if (this.state.phase === 4) {
            const minOpacity = 0.2;
            const targetOpacity = minOpacity + (progress * 0.8);
            this.elements.auroraGradient.style.opacity = targetOpacity;
        } else {
            // For other phases, use the normal gradient opacity
            this.elements.auroraGradient.style.opacity = progress;
        }
    }

    playEatSound() {
        try {
            if (!this.audio.eat) return;
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
        const currentX = parseFloat(this.elements.cursor.style.left) || 50;
        const currentY = parseFloat(this.elements.cursor.style.top) || 55;
        const targetX = 50;
        const targetY = 50;
        const duration = 2000;
        const steps = 60;
        let step = 0;
        const animation = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const newX = currentX + (targetX - currentX) * easeProgress;
            const newY = currentY + (targetY - currentY) * easeProgress;
            this.elements.cursor.style.left = `${newX}%`;
            this.elements.cursor.style.top = `${newY}%`;
            if (step >= steps) {
                clearInterval(animation);
                this.completePhase2Transition();
            }
        }, duration / steps);
    }

    startPhase3() {
        this.elements.cursor.style.boxShadow = `0 0 0px rgba(255, 255, 255, 0)`;
        this.elements.auroraGradient.style.opacity = 0.0;
        this.state.phase = 3;
        this.state.isMovementLocked = true;
        const currentX = parseFloat(this.elements.cursor.style.left) || 50;
        const currentY = parseFloat(this.elements.cursor.style.top) || 55;
        const targetX = 50;
        const targetY = 50;
        const duration = 2000;
        const steps = 60;
        let step = 0;
        const animation = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const newX = currentX + (targetX - currentX) * easeProgress;
            const newY = currentY + (targetY - currentY) * easeProgress;
            this.elements.cursor.style.left = `${newX}%`;
            this.elements.cursor.style.top = `${newY}%`;
            if (step >= steps) {
                clearInterval(animation);
                this.completePhase3Transition();
            }
        }, duration / steps);
    }

    completePhaseTransition(pauseAudioKey, playAudioKey, showGif = true) {
        this.state.isMovementLocked = true;
        if (this.audio[pauseAudioKey]) this.audio[pauseAudioKey].pause();
        if (this.audio[playAudioKey]) {
            this.audio[playAudioKey].currentTime = 0; // Restart from beginning
            this.audio[playAudioKey].loop = true;
            this.audio[playAudioKey].volume = 1.0;
            this.audio[playAudioKey].play().catch(console.error);
        }
        
        if (showGif) {
            if (this.elements.auroraGradient) this.elements.auroraGradient.style.display = 'none';
            if (this.elements.auroraGif) {
                this.elements.auroraGif.style.display = 'block';
                setTimeout(() => {
                    this.elements.auroraGif.style.opacity = '1';
                }, 100);
            }
        }
    }

    completePhase2Transition() {
        this.completePhaseTransition('background', 'dialog', true);
        this.elements.cursor.style.opacity = '0.35';
        this.state.stars.forEach(star => star.element.remove());
        this.state.stars = [];

        // show interlude for phase 2 (dialogues.interlude1) then start Phase 2 gameplay
        this.showDialogSequence(this.dialogues.interlude1, 2500)
            .then(() => { this.startPhase2Gameplay(); })
            .catch((e) => { console.error(e); this.startPhase2Gameplay(); });
    }

    completePhase3Transition() {
        this.completePhaseTransition('dialog', null, true);
        this.playMusic('fight', { loop: true, volume: 1.0, fadeOutOthers: true });
    }

    completePhase4Transition() {
        this.completePhaseTransition('background', 'dialog', false);
        if (this.elements.auroraGradient) {
            this.elements.auroraGradient.style.display = 'block';
            this.elements.auroraGradient.style.opacity = '0.2';
        }
        if (this.elements.auroraGif) {
            this.elements.auroraGif.style.display = 'none';
        }
    }

    showInterlude(lines = [], callback) {
        if (!this.elements.dialog || !this.elements.dialogText) {
            if (callback) callback();
            return;
        }
        this.elements.dialog.style.display = 'block';
        this.elements.dialogText.style.opacity = '0';
        let idx = 0;
        const step = () => {
            const text = lines[idx] || "";
            this.elements.dialogText.style.opacity = '0';
            setTimeout(() => {
                this.elements.dialogText.textContent = text;
                this.elements.dialogText.style.opacity = '1';
                setTimeout(() => {
                    this.elements.dialogText.style.opacity = '0';
                    idx++;
                    if (idx < lines.length) {
                        setTimeout(step, 400);
                    } else {
                        setTimeout(() => {
                            this.elements.dialog.style.display = 'none';
                            if (callback) callback();
                        }, 400);
                    }
                }, 2500);
            }, 300);
        };

        step();
    }

    startPhase2Gameplay() {
        this.state.phase = 2;
        this.state.isMovementLocked = false;
        this.elements.auroraGradient.style.display = 'block';
        this.elements.auroraGif.style.display = 'none';
        this.elements.auroraGradient.style.opacity = '0';
        this.state.health = this.state.maxHealth;
        this.updateHealthBarVisibility(true);
        this.updateHealthBar();
        this.spawnEnemies(5, 'STATIC');
        this.state.totalStars = 30;
        this.generateStars();  
        this.state.collectedStars = 0;
        this.elements.cursor.style.opacity = '1.0';

        // show phase-2 flavor lines in the dialog pane (non-blocking)
        this.showDialogSequence(this.dialogues.phase2, 3000).catch(console.error);
    }

    startPhase3Gameplay() {
        this.state.phase = 3;
        this.state.isMovementLocked = false;
        this.elements.auroraGradient.style.display = 'block';
        this.elements.auroraGif.style.display = 'none';
        this.elements.auroraGradient.style.opacity = '0';
        this.updateHealthBarVisibility(true);
        this.updateHealthBar();
        this.spawnEnemies(3, 'STATIC');
        this.spawnEnemies(4, 'FOLLOWING');
        this.state.totalStars = 30;
        this.generateStars();  
        this.state.collectedStars = 0;
        this.elements.cursor.style.opacity = '1.0';
    }

    startPhase4() {
        this.state.phase = 4;
        this.clearEnemies();
        this.state.stars.forEach(star => star.element.remove());
        this.state.stars = [];
        this.state.isMovementLocked = true;
        this.elements.cursor.style.left = '50%';
        this.elements.cursor.style.top = '50%';
        this.updateHealthBarVisibility(false);
        
        // Use gradient instead of GIF for Phase 4
        this.elements.auroraGradient.style.display = 'block';
        this.elements.auroraGif.style.display = 'none';
        this.elements.auroraGradient.style.opacity = '0.2';

        if (this.audio.fight) {
            this.audio.fight.pause();
            this.audio.fight.currentTime = 0;
        }
        this.playMusic('background-music', { loop: true, volume: 0.75, fadeOutOthers: true });

        // Show phase4 intro lines, then run the transformation sequence
        this.showDialogSequence(this.dialogues.phase4, 3000)
            .then(() => { this.showTransformationSequence(); })
            .catch((e) => { console.error(e); this.showTransformationSequence(); });
    }

    showTransformationSequence() {
        this.showPhase4Dialog("You've endured the darkness...", 2000);
        setTimeout(() => {
            this.showPhase4Dialog("But you were never alone.", 2000);
            setTimeout(() => {
                this.spawnFriends();
                setTimeout(() => {
                    this.showPhase4Dialog("Together, we transform the world.", 3000);
                    setTimeout(() => {
                        this.createWhiteFlash(() => {
                            this.activateAura();
                            this.makeEnemiesHarmless();
                            this.startPhase4Gameplay();
                        });
                    }, 3500);
                }, 2500);
            }, 2500);
        }, 2500);
    }

    spawnFriends() {
        const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444', '#8b5cf6'];
        const numFriends = 6;
        const radius = 60;
        for (let i = 0; i < numFriends; i++) {
            const angle = (i / numFriends) * 2 * Math.PI;
            const friendEl = document.createElement('div');
            friendEl.className = 'friend';
            friendEl.style.backgroundColor = colors[i % colors.length];
            friendEl.style.left = '50%';
            friendEl.style.top = '50%';
            friendEl.style.opacity = '0';
            this.elements.container.appendChild(friendEl);
            setTimeout(() => {
                friendEl.style.opacity = '1';
                friendEl.style.transition = 'left 1.5s ease, top 1.5s ease';
                friendEl.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
                friendEl.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
            }, i * 200);
        }
    }

    // Fix the friends rotation in createWhiteFlash:
    createWhiteFlash(callback) {
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.inset = '0';
        flash.style.background = 'white';
        flash.style.opacity = '0';
        flash.style.zIndex = '999';
        flash.style.transition = 'opacity 0.5s ease';
        this.elements.container.appendChild(flash);
        
        const friends = document.querySelectorAll('.friend');
        const cursorRect = this.elements.cursor.getBoundingClientRect();
        const containerRect = this.elements.container.getBoundingClientRect();
        
        // Calculate cursor position as percentage
        const cursorXPercent = parseFloat(this.elements.cursor.style.left) || 50;
        const cursorYPercent = parseFloat(this.elements.cursor.style.top) || 50;
        
        friends.forEach((friend, i) => {
            // Get friend's current position in percentage
            const friendXPercent = parseFloat(friend.style.left) || 50;
            const friendYPercent = parseFloat(friend.style.top) || 50;
            
            // Calculate distance from cursor in percentage
            const dx = friendXPercent - cursorXPercent;
            const dy = friendYPercent - cursorYPercent;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate initial angle
            const initialAngle = Math.atan2(dy, dx);
            
            let startTime = null;
            const rotateAroundCursor = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / 800, 1);
                
                // Increase rotation speed as flash intensifies
                const rotationSpeed = 2 + progress * 10;
                const angle = initialAngle + (progress * Math.PI * 2 * rotationSpeed);
                
                // Calculate new position in percentage
                const newXPercent = cursorXPercent + distance * Math.cos(angle);
                const newYPercent = cursorYPercent + distance * Math.sin(angle);
                
                friend.style.left = `${newXPercent}%`;
                friend.style.top = `${newYPercent}%`;
                
                if (progress < 1) {
                    requestAnimationFrame(rotateAroundCursor);
                }
            };
            
            requestAnimationFrame(rotateAroundCursor);
        });
        
        setTimeout(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                    flash.remove();
                    friends.forEach(friend => friend.remove());
                    if (callback) callback();
                }, 500);
            }, 800);
        }, 100);
    }

    activateAura() {
        if (this.state.auraEl) return;
        this.state.auraActive = true;
        this.state.auraEl = document.createElement('div');
        this.state.auraEl.className = 'aura';
        this.state.auraEl.style.left = '50%';
        this.state.auraEl.style.top = '50%';
        this.elements.container.appendChild(this.state.auraEl);
    }

    makeEnemiesHarmless() {
        this.state.enemies.forEach(enemy => {
            enemy.element.style.opacity = '0.1';
            // enemy.element.style.background = 'rgba(255, 255, 255, 0.2)';
            enemy._harmless = true;
        });
    }

    startPhase4Gameplay() {
        this.state.isMovementLocked = false;
        this.elements.cursor.style.opacity = '1.0';
        this.generateStars();
        this.state.collectedStars = 0;
        this.state.totalStars = this.state.stars.length;
        this.spawnEnemies(5, 'STATIC');
        this.spawnEnemies(5, 'FOLLOWING');
        this.showPhase4Dialog("Collect the final stars in peace.", 3000);
    }

    showPhase4Dialog(text, duration) {
        return new Promise((resolve) => {
            if (!this.elements.dialog || !this.elements.dialogText) return resolve();
            this.elements.dialog.style.display = 'block';
            this.elements.dialogText.style.opacity = '0';
            setTimeout(() => {
                this.elements.dialogText.textContent = text;
                this.elements.dialogText.style.opacity = '1';           
                setTimeout(() => {
                    this.elements.dialogText.style.opacity = '0';
                    setTimeout(() => {
                        this.elements.dialog.style.display = 'none';
                        resolve();
                    }, 500);
                }, duration);
            }, 300);
        });
    }

    handleWin() {
        this.clearEnemies();
        if (this.state.auraEl) { this.state.auraEl.remove(); this.state.auraEl = null; this.state.auraActive = false; }
        this.elements.cursor.style.left = '50%';
        this.elements.cursor.style.top = '50%';
        this.state.isMovementLocked = true;
        if (this.elements.dialog && this.elements.dialogText) {
            this.elements.dialog.style.display = 'block';
            this.elements.dialogText.textContent = "You endured the darkness. you win.";
            this.elements.dialogText.style.opacity = '1';
        }
        if (this.audio.theme) {
            this.audio.dialog.pause();
            this.audio.theme.loop = false;
            this.audio.theme.volume = 1.0;
            this.audio.theme.play().catch(console.error);
        }
        setTimeout(() => {
            window.location.reload();
        }, 3500);
    }

    handleGameOver() {
        this.clearEnemies();
        this.state.isMovementLocked = true;
        if (this.elements.dialog && this.elements.dialogText) {
            this.elements.dialog.style.display = 'block';
            this.elements.dialogText.textContent = "You were overwhelmed. Try again.";
            this.elements.dialogText.style.opacity = '1';
        }
        setTimeout(() => {
            window.location.reload();
        }, 2200);
    }

    async handleFinalVictory() {
        this.state.isMovementLocked = true;
        this.clearEnemies();

        // show the ending set of lines
        await this.showDialogSequence(this.dialogues.ending, 4000);

        // Start the ending sequence
        await this.playEndingSequence();
    }

    async playEndingSequence() {

        // Step 1: Animate cursor retreat to center
        await this.removeAura();
        await this.animateCursorToCenter();
        
        // Step 3: Switch to theme music
        this.switchToThemeMusic();
        
        // Step 4: Dim lights slowly
        await this.dimLightsSlowly();
        
        // Step 5: Display the birthday GIF and hide cursor
        await this.showBirthdayGifAndHideCursor();
    }

    async animateCursorToCenter() {
        return new Promise((resolve) => {
            const currentX = parseFloat(this.elements.cursor.style.left) || 50;
            const currentY = parseFloat(this.elements.cursor.style.top) || 50;
            const targetX = 50;
            const targetY = 50;
            const duration = 2000;
            const steps = 60;
            let step = 0;

            const animation = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                
                const newX = currentX + (targetX - currentX) * easeProgress;
                const newY = currentY + (targetY - currentY) * easeProgress;
                
                this.elements.cursor.style.left = `${newX}%`;
                this.elements.cursor.style.top = `${newY}%`;
                
                if (step >= steps) {
                    clearInterval(animation);
                    resolve();
                }
            }, duration / steps);
        });
    }

    async removeAura() {
        return new Promise((resolve) => {
            if (this.state.auraEl) {
                this.state.auraEl.style.transition = 'opacity 1s ease, transform 1s ease';
                this.state.auraEl.style.opacity = '0';
                this.state.auraEl.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                    if (this.state.auraEl) {
                        this.state.auraEl.remove();
                        this.state.auraEl = null;
                        this.state.auraActive = false;
                    }
                    resolve();
                }, 1000);
            } else {
                resolve();
            }
        });
    }

    switchToThemeMusic() {
        // Fade out any currently playing audio except theme
        Object.entries(this.audio).forEach(([k, a]) => {
            if (a && !a.paused && k !== 'theme') {
                const iv = setInterval(() => {
                    a.volume = Math.max(0, a.volume - 0.1);
                    if (a.volume <= 0.05) {
                        clearInterval(iv);
                        a.pause();
                        a.currentTime = 0;
                    }
                }, 100);
            }
        });

        // Start theme
        if (this.audio.theme) {
            const t = this.audio.theme;
            t.currentTime = 0;
            t.loop = true;          // we will pause & reload after the GIF shows
            t.volume = 0;
            const p = t.play();
            if (p) p.catch(console.error);

            // Fade-in
            const ivIn = setInterval(() => {
                t.volume = Math.min(0.9, t.volume + 0.1);
                if (t.volume >= 0.9) clearInterval(ivIn);
            }, 150);
        }
    }

    async dimLightsSlowly() {
        return new Promise((resolve) => {
            const duration = 3000; // 3 seconds
            const steps = 60;
            const stepDuration = duration / steps;
            let step = 0;

            const dimming = setInterval(() => {
                step++;
                const progress = step / steps;
                
                // Dim the aurora gradient
                if (this.elements.auroraGradient) {
                    const currentOpacity = 0.2; // Starting opacity from Phase 4
                    const targetOpacity = 0.05;
                    const newOpacity = currentOpacity - ((currentOpacity - targetOpacity) * progress);
                    this.elements.auroraGradient.style.opacity = newOpacity;
                }
                
                // Dim the cursor glow
                const maxGlow = 200;
                const currentGlow = maxGlow * (1 - progress * 0.7); // Reduce glow by 70%
                const currentOpacity = 1.0 * (1 - progress * 0.5); // Reduce opacity by 50%
                this.elements.cursor.style.boxShadow = `
                    0 0 ${currentGlow * 0.4}px rgba(255, 255, 255, ${currentOpacity}),
                    0 0 ${currentGlow * 0.6}px rgba(255, 255, 255, ${currentOpacity * 0.6}),
                    0 0 ${currentGlow}px rgba(255, 255, 255, ${currentOpacity * 0.3})
                `;
                
                if (step >= steps) {
                    clearInterval(dimming);
                    resolve();
                }
            }, stepDuration);
        });
    }

    async showBirthdayGifAndHideCursor() {
        return new Promise((resolve) => {
            // 1) Hide/park the cursor
            this.elements.cursor.style.transition = 'opacity 600ms ease';
            this.elements.cursor.style.opacity = '0';

            // 2) Ensure a single reusable <img id="phase4-gif"> exists
            if (!this.elements.phase4Gif) {
                const img = document.createElement('img');
                img.id = 'phase4-gif';
                this.elements.container.appendChild(img);
                this.elements.phase4Gif = img;
            }
            this.elements.phase4Gif.src = 'assets/peach_birthday.gif';

            // 3) Simple, fail-safe full-screen styles
            Object.assign(this.elements.phase4Gif.style, {
                position: 'absolute',
                inset: '0',
                margin: 'auto',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                background: '#000',
                display: 'block',
                opacity: '0',
                transition: 'opacity 900ms',
                zIndex: '1000'
            });

            // 4) Ensure gradient/gifs underneath won’t hide it
            if (this.elements.auroraGif) this.elements.auroraGif.style.display = 'none';
            if (this.elements.auroraGradient) this.elements.auroraGradient.style.opacity = '0.05';

            // 5) Load source first, then reveal (works even if cached)
            const run = () => {
                // fade in
                requestAnimationFrame(() => { this.elements.phase4Gif.style.opacity = '1'; });

                // let it play for N seconds, then end cleanly
                const DISPLAY_MS = 45000;
                setTimeout(() => {
                    try {
                        if (this.audio.theme) {
                            this.audio.theme.loop = false;
                            this.audio.theme.pause();
                            this.audio.theme.currentTime = 0;
                        }
                    } catch {}
                    // Back to loading screen (your existing behavior)
                    window.location.reload();
                    resolve();
                }, DISPLAY_MS);
            };

            this.elements.phase4Gif.onload = run;
            this.elements.phase4Gif.onerror = run;  // even if asset fails, don’t hang on black
            this.elements.phase4Gif.src = 'assets/peach_birthday.gif';

            // If cached, onload may not fire—handle that:
            if (this.elements.phase4Gif.complete) {
                // Defer to ensure styles applied
                setTimeout(run, 0);
            }
        });
    }

    runGifSequence = () => {
        this.setupGifAnimation(this.elements.phase4Gif, displayStrategy);

        setTimeout(() => {
            this.elements.phase4Gif.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            this.audio.theme.loop = false; // stop infinite loop
            this.audio.theme.pause();
            window.location.reload(); // back to loading screen
            resolve();
        }, 46000);
    }

    spawnEnemies(count = 1, type = 'STATIC') {
        for (let i = 0; i < count; i++) {
            const enemyEl = document.createElement('div');
            enemyEl.className = 'enemy';
            enemyEl.style.backgroundColor = (type === 'STATIC') ? '#1b1818ff' : '#ba1f1fff';
            const xPct = 5 + Math.random() * 90;
            const yPct = 5 + Math.random() * 90;
            enemyEl.style.left = `${xPct}%`;
            enemyEl.style.top = `${yPct}%`;
            enemyEl.style.opacity = '1';
            this.elements.container.appendChild(enemyEl);
            this.state.enemies.push({
                element: enemyEl,
                type,
                xPct,
                yPct,
                _hitCooldown: false
            });
        }
    }

    clearEnemies() {
        this.state.enemies.forEach(e => {
            if (e.element && e.element.parentNode) {
                e.element.parentNode.removeChild(e.element);
            }
        });
        this.state.enemies = [];
        if (this.state.phaseTimer) { 
            clearTimeout(this.state.phaseTimer); 
            this.state.phaseTimer = null; 
        }
    }

    updateEnemiesFrame() {
        if (!this.state.enemies || this.state.enemies.length === 0) return;
        const rect = this.elements.container.getBoundingClientRect();
        const cursorRect = this.elements.cursor.getBoundingClientRect();
        const px = ((cursorRect.left + cursorRect.right) / 2 - rect.left) / rect.width * 100;
        const py = ((cursorRect.top + cursorRect.bottom) / 2 - rect.top) / rect.height * 100;

        this.state.enemies.forEach(enemy => {
            if (enemy.type === 'FOLLOWING') {
                const dx = px - enemy.xPct;
                const dy = py - enemy.yPct;
                const dist = Math.hypot(dx, dy) || 1;
                const speedPctPerFrame = 0.18;
                enemy.xPct += (dx / dist) * speedPctPerFrame;
                enemy.yPct += (dy / dist) * speedPctPerFrame;
                enemy.element.style.left = `${enemy.xPct}%`;
                enemy.element.style.top = `${enemy.yPct}%`;
            }
        });
    }

    checkEnemyCollisions() {
        if (!this.state.enemies || !this.elements.cursor) return;
        const cursorRect = this.elements.cursor.getBoundingClientRect();
        const cursorX = (cursorRect.left + cursorRect.right) / 2;
        const cursorY = (cursorRect.top + cursorRect.bottom) / 2;
        const cursorRadius = cursorRect.width / 2;
        this.state.enemies.forEach(enemy => {
            const eRect = enemy.element.getBoundingClientRect();
            const eX = (eRect.left + eRect.right) / 2;
            const eY = (eRect.top + eRect.bottom) / 2;
            const eRadius = eRect.width / 2;
            const dist = Math.hypot(cursorX - eX, cursorY - eY);
            if (dist <= cursorRadius + eRadius) {
                if (this.state.auraActive) {
                    enemy.element.style.opacity = '0.12';
                } else {
                    this._applyDamageAndKnockback(enemy);
                }
            }
        });
    }

    _applyDamageAndKnockback(enemy) {
        if (enemy._hitCooldown || enemy._harmless) return;
        enemy._hitCooldown = true;
        setTimeout(() => enemy._hitCooldown = false, 420);
        try {
            if (this.audio.enemyHit) {
                this.audio.enemyHit.currentTime = 0;
                this.audio.enemyHit.volume = 0.3;
                this.audio.enemyHit.play().catch(console.error);
            }
        } catch (error) {
            console.warn('Error playing enemy hit sound:', error);
        }
        enemy.element.style.transition = 'transform 0.18s ease, opacity 0.18s ease';
        enemy.element.style.transform = 'scale(1.12)';
        setTimeout(() => enemy.element.style.transform = '', 180);
        this.state.health = Math.max(0, this.state.health - 1);
        this.updateHealthBar();
        if (this.state.health <= 0) {
            setTimeout(() => this.handleGameOver(), 220);
        }
    }
    
    updateHealthBar() {
        if (!this.elements.healthBar) return;
        const ratio = Math.max(0, Math.min(1, this.state.health / this.state.maxHealth));
        this.elements.healthBar.style.width = `${100 * ratio}px`;
    }

    updateHealthBarVisibility(visible) {
        if (!this.elements.healthBar) return;
        this.elements.healthBar.style.display = visible ? 'block' : 'none';
    }

    animationLoop() {
        if (this.state.phase === 2 || this.state.phase === 3 || this.state.phase === 4) {
            this.updateEnemiesFrame();
        }
        requestAnimationFrame(() => this.animationLoop());
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
                });
            }
        };
        showNextDialog();
    }

    fadeDialog(text, callback) {
        if (!this.elements.dialogText) {
            if (callback) callback();
            return;
        }
        this.elements.dialogText.style.opacity = '0';
        setTimeout(() => {
            this.elements.dialogText.textContent = text;
            this.elements.dialogText.style.opacity = '1';
            if (callback) setTimeout(callback, 2000);
        }, 500);
    }

    calculateGifDisplay(gifId) {
        const metadata = this.gifMetadata[gifId] || { width: 480, height: 360 };
        const container = this.elements.container;
        const containerAspect = container.clientWidth / container.clientHeight;
        const gifAspect = metadata.width / metadata.height;
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
        const SCALE_FACTOR = 0.9;
        if (gifAspect > containerAspect) {
            displayStrategy.objectFit = 'cover';
            displayStrategy.height = '100%';
            displayStrategy.initialPosition = '0% 50%';
            displayStrategy.finalPosition = '100% 50%';
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        } else if (gifAspect < containerAspect) {
            displayStrategy.objectFit = 'cover';
            displayStrategy.width = '100%';
            displayStrategy.initialPosition = '50% 0%';
            displayStrategy.finalPosition = '50% 100%';
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        } else {
            displayStrategy.objectFit = 'cover';
            displayStrategy.initialTransform = `scale(${SCALE_FACTOR})`;
            displayStrategy.finalTransform = `scale(${SCALE_FACTOR})`;
        }
        return displayStrategy;
    }

    setupGifAnimation(gifElement, strategy) {
        gifElement.style.transition = 'none';
        gifElement.style.transform = strategy.initialTransform;
        gifElement.style.objectFit = strategy.objectFit;
        gifElement.style.objectPosition = strategy.initialPosition;
        gifElement.style.width = strategy.width;
        gifElement.style.height = strategy.height;
        gifElement.offsetHeight;
        const transitions = [
            `transform ${strategy.duration} ease-out`,
            `object-position ${strategy.duration} linear`
        ].join(', ');
        setTimeout(() => {
            gifElement.style.transition = transitions;
            gifElement.style.transform = strategy.finalTransform;
            gifElement.style.objectPosition = strategy.finalPosition;
        }, 50);
    }

    setupTouchControls() {
        this.elements.container.addEventListener('touchmove', (e) => {
            if (this.state.isMovementLocked || this.state.isLoading) return;
            const rect = this.elements.container.getBoundingClientRect();
            const touch = e.touches[0];
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;
            this.elements.cursor.style.left = `${x}%`;
            this.elements.cursor.style.top = `${y}%`;

            if (this.state.phase === 1 || this.state.phase === 2 || this.state.phase === 3) {
                this.checkStarCollection();
                this.checkEnemyCollisions();
            }
        }, { passive: false });
    }

    async playSequence(sequence) {
        if (!sequence) return;
        let gifIndex = 0;
        let dialogueIndex = 0;
        const playNextGif = async () => {
            if (gifIndex >= sequence.gifs.length) return;
            const gif = sequence.gifs[gifIndex];
            if (!this.elements.phase4Gif) {
                this.elements.phase4Gif = document.createElement('img');
                this.elements.phase4Gif.id = 'phase4-gif';
                this.elements.container.appendChild(this.elements.phase4Gif);
            }
            this.elements.phase4Gif.style.opacity = '0';
            if (gifIndex > 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            const displayStrategy = this.calculateGifDisplay(gif.url);
            Object.assign(this.elements.phase4Gif.style, {
                display: 'block',
                opacity: '0',
                position: 'absolute',
                inset: '0',
                width: displayStrategy.width,
                height: displayStrategy.height,
                objectFit: displayStrategy.objectFit
            });
            if (gif.url.startsWith("assets/")) {
                this.elements.phase4Gif.src = gif.url;
            } else {
                this.elements.phase4Gif.src = `https://media.giphy.com/media/${gif.url}/giphy.gif`;
            }
            await new Promise((resolve) => { this.elements.phase4Gif.onload = resolve; });
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
            if (!this.elements.phase4Dialog) {
                this.elements.phase4Dialog = document.createElement('div');
                this.elements.phase4Dialog.id = 'phase4-dialog';
                this.elements.container.appendChild(this.elements.phase4Dialog);
            }
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

    async init() {
        try {
            this.showLoadingScreen();
            this.updateHealthBarVisibility(false);
            const startBtn = document.getElementById('start-btn');
            if (startBtn) {
                startBtn.addEventListener('click', async () => {
                    startBtn.style.display = 'none';
                    try {
                        await this.preloadAssets();
                        this.generateStars();
                        this.setupEventListeners();
                        this.setupCursorAnimation();
                        this.setupTouchControls();
                        this.hideLoadingScreen();
                        this.startBackgroundMusic();
                        this.animationLoop();

                    } catch (error) {
                        console.error('Initialization error:', error);
                        this.handleError('Failed to initialize experience. Please try again.');
                    }
                });
            }
        } catch (error) {
            console.error('Initial setup error:', error);
            this.handleError('Failed to set up experience');
        }
    }

    handleError(message) {
        console.error(message);
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.innerHTML = `
                <div class="loading-content">
                    <h2>Loading Error</h2>
                    <p>${message}</p>
                    <button class="retry-button" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AuroraExperience();
});
