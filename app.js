// NBHWC Prep Pro - Interactive Study Platform
// Copyright 2025 Energize and Empower

class NBHWCPrepPro {
    constructor() {
        this.currentUser = this.loadUserData();
        this.domains = this.initializeDomains();
        this.questions = this.initializeQuestions();
        this.flashcards = this.initializeFlashcards();
        this.achievements = this.initializeAchievements();
        
        this.currentQuiz = null;
        this.currentFlashcardIndex = 0;
        this.currentFlashcardSet = [];
        
        this.init();
    }

    init() {
        console.log('Initializing NBHWC Prep Pro...');
        this.setupNavigation();
        this.setupStudyPlanner();
        this.setupQuiz();
        this.setupFlashcards();
        this.setupProgress();
        this.updateDashboard();
        this.checkAchievements();
        
        // Load dashboard by default
        this.showSection('dashboard');
        console.log('NBHWC Prep Pro initialized successfully!');
    }

    // Data initialization
    initializeDomains() {
        return [
            {
                name: "Coaching Process",
                weight: "47-53%",
                topics: ["Motivational Interviewing", "OARS Techniques", "Session Structure", "Goal Setting", "Change Talk", "Reflective Listening"],
                questionCount: 800,
                userProgress: this.currentUser.domainProgress?.["Coaching Process"] || 0
            },
            {
                name: "Health & Wellness", 
                weight: "17-23%",
                topics: ["SMART Goals", "Exercise Protocols", "Nutrition Fundamentals", "Sleep Hygiene", "Stress Management", "Behavior Change"],
                questionCount: 600,
                userProgress: this.currentUser.domainProgress?.["Health & Wellness"] || 0
            },
            {
                name: "Coaching Structure",
                weight: "17-23%", 
                topics: ["Legal Frameworks", "Ethics", "Professional Boundaries", "Coaching Agreements", "Scope of Practice"],
                questionCount: 400,
                userProgress: this.currentUser.domainProgress?.["Coaching Structure"] || 0
            },
            {
                name: "Ethics & Professional Responsibility",
                weight: "7-13%",
                topics: ["HIPAA Compliance", "Referral Protocols", "Professional Standards", "Confidentiality", "Ethical Decision Making"],
                questionCount: 200,
                userProgress: this.currentUser.domainProgress?.["Ethics & Professional Responsibility"] || 0
            }
        ];
    }

    initializeQuestions() {
        const baseQuestions = [
            {
                domain: "Coaching Process",
                question: "Which of the following is the most effective open-ended question for exploring a client's motivation for change?",
                options: ["Do you want to lose weight?", "What would be different in your life if you achieved your wellness goals?", "Are you ready to start exercising?", "Can you commit to eating healthier?"],
                correct: 1,
                explanation: "Open-ended questions beginning with 'what' or 'how' encourage deeper reflection and exploration of client motivations, leading to more meaningful conversations about change.",
                eli5: "Think of it like asking a friend about their dreams instead of just asking yes/no questions. When you ask 'what would be different', you're helping them paint a picture of their better life!"
            },
            {
                domain: "Ethics & Professional Responsibility", 
                question: "When should a health coach refer a client to another healthcare professional?",
                options: ["When the client asks personal questions", "When the client has a medical condition requiring diagnosis or treatment", "When the client disagrees with your advice", "When the client misses appointments"],
                correct: 1,
                explanation: "Health coaches must refer clients when issues fall outside their scope of practice, particularly medical diagnosis and treatment. This ensures client safety and maintains professional boundaries.",
                eli5: "It's like being a really good friend who knows when to say 'You should talk to a doctor about that!' Health coaches help with healthy living, but doctors help with medical problems."
            },
            {
                domain: "Coaching Process",
                question: "What is the primary purpose of reflective listening in health coaching?",
                options: ["To show you're paying attention", "To demonstrate understanding and encourage elaboration", "To correct client misconceptions", "To provide immediate solutions"],
                correct: 1,
                explanation: "Reflective listening demonstrates understanding and encourages clients to elaborate on their thoughts and feelings, creating deeper self-awareness and motivation for change.",
                eli5: "It's like being a really good mirror that helps people see themselves better. When you reflect back what someone says, they often discover new things about themselves!"
            },
            {
                domain: "Health & Wellness",
                question: "Which component is essential for creating effective SMART goals?",
                options: ["Making them as challenging as possible", "Ensuring they are specific and measurable", "Setting multiple goals simultaneously", "Focusing only on long-term outcomes"],
                correct: 1,
                explanation: "SMART goals must be Specific, Measurable, Achievable, Relevant, and Time-bound. Specificity and measurability are crucial for tracking progress and maintaining motivation.",
                eli5: "SMART goals are like having a really clear treasure map. Instead of saying 'find treasure somewhere', you say 'find the red treasure chest by the big oak tree before sunset' - much easier to know if you succeeded!"
            },
            {
                domain: "Coaching Structure",
                question: "What should be included in a comprehensive coaching agreement?",
                options: ["Only payment terms", "Goals, expectations, boundaries, and logistics", "Medical treatment plans", "Guaranteed outcomes"],
                correct: 1,
                explanation: "A comprehensive coaching agreement establishes clear expectations, boundaries, logistics, and the coaching relationship framework, protecting both coach and client.",
                eli5: "It's like the rules for a board game - everyone needs to know how to play, what's allowed, and what happens if someone doesn't follow the rules. This keeps everyone happy and safe!"
            }
        ];

        // Generate additional questions for variety
        const additionalQuestions = this.generateAdditionalQuestions(baseQuestions);
        return [...baseQuestions, ...additionalQuestions];
    }

    generateAdditionalQuestions(baseQuestions) {
        const templates = [
            {
                domain: "Coaching Process",
                templates: [
                    "What is the most appropriate response when a client expresses ambivalence about change?",
                    "Which OARS technique is most effective for building rapport?",
                    "How should a coach handle client resistance during a session?"
                ]
            },
            {
                domain: "Health & Wellness",
                templates: [
                    "What is the recommended approach for discussing nutrition with clients?",
                    "How should exercise recommendations be tailored for beginners?",
                    "What role does sleep play in overall wellness coaching?"
                ]
            }
        ];

        const generated = [];
        templates.forEach(template => {
            template.templates.forEach(questionText => {
                generated.push({
                    domain: template.domain,
                    question: questionText,
                    options: this.generateOptions(template.domain),
                    correct: Math.floor(Math.random() * 4),
                    explanation: "This question tests understanding of core " + template.domain.toLowerCase() + " principles.",
                    eli5: "Remember the basics of " + template.domain.toLowerCase() + " - always put the client first and work within your scope!"
                });
            });
        });

        return generated.slice(0, 15); // Limit to 15 additional questions
    }

    generateOptions(domain) {
        const optionSets = {
            "Coaching Process": [
                "Focus on building rapport first",
                "Provide immediate solutions",
                "Challenge their thinking directly", 
                "End the session early"
            ],
            "Health & Wellness": [
                "Recommend strict calorie counting",
                "Start with small, achievable changes",
                "Provide detailed meal plans",
                "Focus only on exercise"
            ],
            "Coaching Structure": [
                "Maintain professional boundaries",
                "Become personally involved",
                "Offer medical advice",
                "Guarantee specific results"
            ],
            "Ethics & Professional Responsibility": [
                "Refer to appropriate professionals",
                "Handle all issues independently",
                "Ignore ethical concerns",
                "Make exceptions for close clients"
            ]
        };

        return optionSets[domain] || optionSets["Coaching Process"];
    }

    initializeFlashcards() {
        return [
            {term: "OARS", definition: "Open-ended questions, Affirmations, Reflective listening, Summaries - core motivational interviewing techniques", category: "Coaching Process"},
            {term: "Change Talk", definition: "Client language that favors movement toward a particular change goal", category: "Coaching Process"},
            {term: "Sustain Talk", definition: "Client language that favors maintaining the status quo", category: "Coaching Process"},
            {term: "SMART Goals", definition: "Specific, Measurable, Achievable, Relevant, Time-bound goal-setting framework", category: "Health & Wellness"},
            {term: "Scope of Practice", definition: "The boundaries within which health coaches can legally and ethically operate", category: "Ethics & Professional Responsibility"},
            {term: "Motivational Interviewing", definition: "A collaborative, goal-oriented method of communication with particular attention to the language of change", category: "Coaching Process"},
            {term: "Transtheoretical Model", definition: "Stages of Change model: Precontemplation, Contemplation, Preparation, Action, Maintenance", category: "Health & Wellness"},
            {term: "Professional Boundaries", definition: "Limits that protect the space between professional duties and personal life", category: "Coaching Structure"},
            {term: "HIPAA", definition: "Health Insurance Portability and Accountability Act - protects patient health information", category: "Ethics & Professional Responsibility"},
            {term: "Self-Efficacy", definition: "An individual's belief in their capacity to execute behaviors necessary to produce specific performance attainments", category: "Health & Wellness"}
        ];
    }

    initializeAchievements() {
        return [
            {id: "week-warrior", name: "Week Warrior", description: "Complete 7 consecutive days of study", icon: "🏆", earned: false},
            {id: "domain-master", name: "Domain Master", description: "Achieve 90%+ accuracy in any domain", icon: "🎯", earned: false}, 
            {id: "speed-demon", name: "Speed Demon", description: "Answer 50 questions in under 30 minutes", icon: "⚡", earned: false},
            {id: "comeback-kid", name: "Comeback Kid", description: "Improve score by 20% on retaken quiz", icon: "📈", earned: false},
            {id: "knowledge-seeker", name: "Knowledge Seeker", description: "Complete 100 flashcards", icon: "📚", earned: false},
            {id: "consistency-champion", name: "Consistency Champion", description: "Study for 30 consecutive days", icon: "🔥", earned: false}
        ];
    }

    // User data management
    loadUserData() {
        const defaultUser = {
            totalQuestions: 127,
            studyStreak: 3,
            overallScore: 78,
            readinessScore: 56,
            domainProgress: {
                "Coaching Process": 45,
                "Health & Wellness": 62,
                "Coaching Structure": 38,
                "Ethics & Professional Responsibility": 71
            },
            studyDates: [],
            achievements: [],
            flashcardProgress: {},
            quizHistory: [],
            studyPlan: null,
            lastStudyDate: null
        };

        // Add some study dates for demo
        const dates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            dates.push(date.toDateString());
        }
        defaultUser.studyDates = dates;

        return defaultUser;
    }

    saveUserData() {
        console.log('User data saved successfully');
    }

    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.currentUser.lastStudyDate;
        
        if (lastStudy !== today) {
            if (lastStudy) {
                const lastDate = new Date(lastStudy);
                const todayDate = new Date();
                const diffTime = todayDate - lastDate;
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    this.currentUser.studyStreak++;
                } else if (diffDays > 1) {
                    this.currentUser.studyStreak = 1;
                }
            } else {
                this.currentUser.studyStreak = 1;
            }
            
            this.currentUser.lastStudyDate = today;
            this.currentUser.studyDates.push(today);
            this.saveUserData();
            this.checkAchievements();
        }
    }

    // Navigation
    setupNavigation() {
        console.log('Setting up navigation...');
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation button clicked:', e.target.getAttribute('data-section'));
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
                
                // Update active nav button
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in');
            console.log('Section displayed:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }

        // Update specific sections
        if (sectionId === 'dashboard') {
            this.updateDashboard();
        } else if (sectionId === 'progress') {
            this.updateProgress();
        } else if (sectionId === 'flashcards') {
            this.setupFlashcardInterface();
        }
    }

    // Study Planner
    setupStudyPlanner() {
        console.log('Setting up study planner...');
        const generateBtn = document.getElementById('generatePlan');
        if (generateBtn) {
            generateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Generate plan button clicked');
                this.generateStudyPlan();
            });
        } else {
            console.error('Generate plan button not found');
        }

        // Load existing plan
        if (this.currentUser.studyPlan) {
            this.displayStudyPlan(this.currentUser.studyPlan);
        }
    }

    generateStudyPlan() {
        console.log('Generating study plan...');
        const examDateInput = document.getElementById('examDate');
        const studyHoursSelect = document.getElementById('studyHours');
        const knowledgeLevelSelect = document.getElementById('knowledgeLevel');

        if (!examDateInput || !studyHoursSelect || !knowledgeLevelSelect) {
            console.error('Study plan form elements not found');
            return;
        }

        const examDate = examDateInput.value;
        const studyHours = parseInt(studyHoursSelect.value) || 10;
        const knowledgeLevel = knowledgeLevelSelect.value || 'intermediate';

        if (!examDate) {
            alert('Please select an exam date to generate your study plan.');
            return;
        }

        const today = new Date();
        const exam = new Date(examDate);
        const weeksUntilExam = Math.ceil((exam - today) / (1000 * 60 * 60 * 24 * 7));

        if (weeksUntilExam < 1) {
            alert('Please select an exam date that is at least one week away.');
            return;
        }

        const plan = {
            examDate,
            studyHours,
            knowledgeLevel,
            weeksUntilExam,
            phases: this.createStudyPhases(weeksUntilExam, knowledgeLevel)
        };

        this.currentUser.studyPlan = plan;
        this.saveUserData();
        this.displayStudyPlan(plan);
        console.log('Study plan generated:', plan);
    }

    createStudyPhases(weeks, level) {
        const phases = [];
        
        if (weeks >= 8) {
            phases.push({
                phase: 1,
                name: "Foundation Building",
                weeks: "1-4",
                focus: "60% Coaching Process, 25% Health & Wellness, 15% other domains",
                goals: ["Master OARS techniques", "Understand motivational interviewing", "Learn basic health principles"]
            });
            phases.push({
                phase: 2,
                name: "Deep Dive",
                weeks: "5-8",
                focus: "Practical application and scenario practice across all domains",
                goals: ["Practice complex scenarios", "Strengthen weak areas", "Integrate knowledge"]
            });
            if (weeks > 8) {
                phases.push({
                    phase: 3,
                    name: "Intensive Practice",
                    weeks: `9-${weeks}`,
                    focus: "Full simulations and exam readiness",
                    goals: ["Take practice exams", "Final review", "Build confidence"]
                });
            }
        } else if (weeks >= 4) {
            phases.push({
                phase: 1,
                name: "Intensive Foundation",
                weeks: "1-2",
                focus: "Core concepts across all domains with emphasis on Coaching Process",
                goals: ["Quick mastery of essentials", "Identify knowledge gaps"]
            });
            phases.push({
                phase: 2,
                name: "Practice & Polish",
                weeks: `3-${weeks}`,
                focus: "Heavy practice with immediate feedback",
                goals: ["Intensive question practice", "Memorize key concepts", "Exam readiness"]
            });
        } else {
            phases.push({
                phase: 1,
                name: "Crash Course",
                weeks: `1-${weeks}`,
                focus: "High-intensity review of all domains with focus on highest-weight topics",
                goals: ["Rapid knowledge acquisition", "Practice key question types", "Last-minute preparation"]
            });
        }

        return phases;
    }

    displayStudyPlan(plan) {
        console.log('Displaying study plan:', plan);
        const timeline = document.getElementById('studyTimeline');
        const phasesContainer = timeline.querySelector('.timeline-phases');
        
        if (!timeline || !phasesContainer) {
            console.error('Study timeline elements not found');
            return;
        }
        
        phasesContainer.innerHTML = '';
        
        plan.phases.forEach(phase => {
            const phaseEl = document.createElement('div');
            phaseEl.className = 'timeline-phase fade-in';
            phaseEl.innerHTML = `
                <div class="phase-title">${phase.name}</div>
                <div class="phase-weeks">Weeks ${phase.weeks}</div>
                <div class="phase-focus">${phase.focus}</div>
                <ul class="phase-goals">
                    ${phase.goals.map(goal => `<li>${goal}</li>`).join('')}
                </ul>
            `;
            phasesContainer.appendChild(phaseEl);
        });
        
        timeline.classList.remove('hidden');
    }

    // Quiz System
    setupQuiz() {
        console.log('Setting up quiz system...');
        // Mode selection
        document.querySelectorAll('.mode-card .btn--primary').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.mode-card');
                const mode = card.getAttribute('data-mode');
                if (mode !== 'simulation') {
                    console.log('Starting quiz mode:', mode);
                    this.startQuiz(mode);
                }
            });
        });

        // Domain filter
        this.setupDomainFilter();
        
        // Quiz interface
        this.setupQuizInterface();
    }

    setupDomainFilter() {
        const filterContainer = document.getElementById('domainFilter');
        if (!filterContainer) {
            console.error('Domain filter container not found');
            return;
        }
        
        // Add domain buttons
        this.domains.forEach(domain => {
            const btn = document.createElement('button');
            btn.className = 'domain-btn';
            btn.setAttribute('data-domain', domain.name);
            btn.textContent = domain.name;
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.domain-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
            filterContainer.appendChild(btn);
        });
    }

    setupQuizInterface() {
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        const skipBtn = document.getElementById('skipQuestion');
        const reportBtn = document.getElementById('reportQuestion');
        const closeFeedbackBtn = document.getElementById('closeFeedback');
        const retakeBtn = document.getElementById('retakeQuiz');

        if (submitBtn) submitBtn.addEventListener('click', () => this.submitAnswer());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (skipBtn) skipBtn.addEventListener('click', () => this.skipQuestion());
        if (reportBtn) reportBtn.addEventListener('click', () => this.showReportModal());
        if (closeFeedbackBtn) closeFeedbackBtn.addEventListener('click', () => this.closeFeedback());
        if (retakeBtn) retakeBtn.addEventListener('click', () => this.retakeQuiz());

        // Report modal
        this.setupReportModal();
    }

    startQuiz(mode) {
        const questionCounts = {
            'quick': 10,
            'focused': 25
        };

        const selectedDomain = document.querySelector('.domain-btn.active')?.getAttribute('data-domain');
        let questions = this.questions.slice();

        // Filter by domain if selected
        if (selectedDomain && selectedDomain !== 'all') {
            questions = questions.filter(q => q.domain === selectedDomain);
        }

        // Shuffle and limit questions
        questions = this.shuffleArray(questions).slice(0, questionCounts[mode]);

        this.currentQuiz = {
            mode,
            questions,
            currentIndex: 0,
            answers: [],
            startTime: Date.now(),
            selectedDomain
        };

        this.showQuizInterface();
        this.displayQuestion();
        this.updateStudyStreak();
    }

    showQuizInterface() {
        const quizModes = document.getElementById('quizModes');
        const domainFilter = document.querySelector('.domain-filter');
        const quizInterface = document.getElementById('quizInterface');

        if (quizModes) quizModes.classList.add('hidden');
        if (domainFilter) domainFilter.classList.add('hidden');
        if (quizInterface) {
            quizInterface.classList.remove('hidden');
            quizInterface.classList.add('fade-in');
        }
    }

    displayQuestion() {
        if (!this.currentQuiz || !this.currentQuiz.questions.length) return;

        const question = this.currentQuiz.questions[this.currentQuiz.currentIndex];
        
        const questionDomainEl = document.getElementById('questionDomain');
        const questionTextEl = document.getElementById('questionText');
        const progressTextEl = document.getElementById('progressText');
        const progressFillEl = document.getElementById('progressFill');

        if (questionDomainEl) questionDomainEl.textContent = question.domain;
        if (questionTextEl) questionTextEl.textContent = question.question;
        if (progressTextEl) {
            progressTextEl.textContent = `Question ${this.currentQuiz.currentIndex + 1} of ${this.currentQuiz.questions.length}`;
        }
        
        const progressPercent = ((this.currentQuiz.currentIndex + 1) / this.currentQuiz.questions.length) * 100;
        if (progressFillEl) progressFillEl.style.width = `${progressPercent}%`;

        // Display options
        const optionsContainer = document.getElementById('answerOptions');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'answer-option';
                optionEl.setAttribute('data-index', index);
                optionEl.setAttribute('data-letter', String.fromCharCode(65 + index));
                optionEl.innerHTML = `<div class="answer-text">${option}</div>`;
                
                optionEl.addEventListener('click', () => this.selectAnswer(index));
                optionsContainer.appendChild(optionEl);
            });
        }

        // Reset submit button
        const submitBtn = document.getElementById('submitAnswer');
        if (submitBtn) submitBtn.disabled = true;
    }

    selectAnswer(index) {
        document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
        const selectedOption = document.querySelector(`[data-index="${index}"]`);
        if (selectedOption) selectedOption.classList.add('selected');
        
        const submitBtn = document.getElementById('submitAnswer');
        if (submitBtn) submitBtn.disabled = false;
        
        this.currentQuiz.selectedAnswer = index;
    }

    submitAnswer() {
        if (!this.currentQuiz) return;

        const question = this.currentQuiz.questions[this.currentQuiz.currentIndex];
        const isCorrect = this.currentQuiz.selectedAnswer === question.correct;
        
        this.currentQuiz.answers.push({
            questionIndex: this.currentQuiz.currentIndex,
            selectedAnswer: this.currentQuiz.selectedAnswer,
            correct: isCorrect,
            timeSpent: Date.now() - (this.currentQuiz.questionStartTime || Date.now())
        });

        this.showFeedback(isCorrect, question);
    }

    showFeedback(isCorrect, question) {
        const modal = document.getElementById('feedbackModal');
        const result = document.getElementById('feedbackResult');
        const explanation = document.getElementById('feedbackExplanation');
        const eli5 = document.getElementById('feedbackEli5');

        if (result) {
            result.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect';
            result.className = `feedback-result ${isCorrect ? 'correct' : 'incorrect'}`;
        }
        
        if (explanation) {
            explanation.innerHTML = `<strong>Explanation:</strong><br>${question.explanation}`;
        }
        
        if (eli5) {
            eli5.innerHTML = question.eli5;
        }

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('fade-in');
        }
    }

    closeFeedback() {
        const modal = document.getElementById('feedbackModal');
        if (modal) modal.classList.add('hidden');
    }

    nextQuestion() {
        this.closeFeedback();
        
        if (!this.currentQuiz) return;

        this.currentQuiz.currentIndex++;
        this.currentQuiz.questionStartTime = Date.now();
        
        if (this.currentQuiz.currentIndex < this.currentQuiz.questions.length) {
            this.displayQuestion();
        } else {
            this.completeQuiz();
        }
    }

    skipQuestion() {
        if (!this.currentQuiz) return;

        this.currentQuiz.answers.push({
            questionIndex: this.currentQuiz.currentIndex,
            selectedAnswer: null,
            correct: false,
            skipped: true
        });
        
        this.nextQuestion();
    }

    completeQuiz() {
        if (!this.currentQuiz) return;

        const correctAnswers = this.currentQuiz.answers.filter(a => a.correct && !a.skipped).length;
        const totalAnswers = this.currentQuiz.answers.filter(a => !a.skipped).length;
        const score = Math.round((correctAnswers / totalAnswers) * 100) || 0;
        
        // Update user stats
        this.currentUser.totalQuestions += totalAnswers;
        
        // Update domain progress
        this.currentQuiz.questions.forEach((q, index) => {
            const answer = this.currentQuiz.answers[index];
            if (answer && !answer.skipped) {
                if (!this.currentUser.domainProgress[q.domain]) {
                    this.currentUser.domainProgress[q.domain] = 0;
                }
                
                const currentProgress = this.currentUser.domainProgress[q.domain];
                const improvement = answer.correct ? 1 : -0.5;
                this.currentUser.domainProgress[q.domain] = Math.max(0, Math.min(100, currentProgress + improvement));
            }
        });

        // Update overall score
        this.currentUser.quizHistory.push({
            mode: this.currentQuiz.mode,
            score,
            date: new Date().toISOString(),
            domain: this.currentQuiz.selectedDomain
        });

        // Calculate new overall score
        const recentQuizzes = this.currentUser.quizHistory.slice(-10);
        this.currentUser.overallScore = Math.round(
            recentQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / recentQuizzes.length
        );

        // Calculate readiness score
        this.currentUser.readinessScore = this.calculateReadinessScore();

        this.saveUserData();
        this.checkAchievements();
        this.showQuizResults(score, correctAnswers, totalAnswers);
    }

    calculateReadinessScore() {
        const domainWeights = {
            "Coaching Process": 0.5,
            "Health & Wellness": 0.2,
            "Coaching Structure": 0.2,
            "Ethics & Professional Responsibility": 0.1
        };

        let weightedScore = 0;
        let totalWeight = 0;

        Object.entries(domainWeights).forEach(([domain, weight]) => {
            const progress = this.currentUser.domainProgress[domain] || 0;
            weightedScore += progress * weight;
            totalWeight += weight;
        });

        return Math.round(weightedScore / totalWeight);
    }

    showQuizResults(score, correct, total) {
        const quizInterface = document.getElementById('quizInterface');
        if (quizInterface) quizInterface.classList.add('hidden');
        
        const resultsSection = document.getElementById('quizResults');
        const finalScoreEl = document.getElementById('finalScore');
        if (finalScoreEl) finalScoreEl.textContent = `${score}%`;
        
        const breakdown = document.getElementById('resultsBreakdown');
        if (breakdown) {
            breakdown.innerHTML = `
                <div class="breakdown-item">
                    <span>Questions Answered:</span>
                    <span>${total}</span>
                </div>
                <div class="breakdown-item">
                    <span>Correct Answers:</span>
                    <span>${correct}</span>
                </div>
                <div class="breakdown-item">
                    <span>Accuracy Rate:</span>
                    <span>${score}%</span>
                </div>
                <div class="breakdown-item">
                    <span>Time Taken:</span>
                    <span>${Math.round((Date.now() - this.currentQuiz.startTime) / 60000)} minutes</span>
                </div>
            `;
        }

        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('fade-in');
        }

        // Add score-based styling
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            if (score >= 90) {
                scoreCircle.style.background = 'var(--color-bg-secondary)';
            } else if (score >= 70) {
                scoreCircle.style.background = 'var(--color-bg-primary)';
            } else {
                scoreCircle.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)';
            }
        }
    }

    retakeQuiz() {
        // Reset quiz interface
        const resultsSection = document.getElementById('quizResults');
        const quizModes = document.getElementById('quizModes');
        const domainFilter = document.querySelector('.domain-filter');

        if (resultsSection) resultsSection.classList.add('hidden');
        if (quizModes) quizModes.classList.remove('hidden');
        if (domainFilter) domainFilter.classList.remove('hidden');
        this.currentQuiz = null;
    }

    // Flashcards
    setupFlashcards() {
        this.setupFlashcardTabs();
        this.setupFlashcardControls();
        this.currentFlashcardSet = this.flashcards.slice();
    }

    setupFlashcardTabs() {
        const tabsContainer = document.getElementById('flashcardTabs');
        if (!tabsContainer) return;
        
        // Get unique categories
        const categories = [...new Set(this.flashcards.map(card => card.category))];
        
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            btn.setAttribute('data-category', category);
            btn.textContent = category;
            btn.addEventListener('click', (e) => {
                this.switchFlashcardCategory(category);
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
            tabsContainer.appendChild(btn);
        });
    }

    setupFlashcardControls() {
        const flipBtn = document.getElementById('flipCard');
        const prevBtn = document.getElementById('prevCard');
        const nextBtn = document.getElementById('nextCard');
        const flashcard = document.getElementById('flashcard');

        if (flipBtn) flipBtn.addEventListener('click', () => this.flipCard());
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousCard());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextCard());
        if (flashcard) flashcard.addEventListener('click', () => this.flipCard());

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.target.getAttribute('data-difficulty');
                this.markCardDifficulty(difficulty);
            });
        });
    }

    setupFlashcardInterface() {
        if (this.currentFlashcardSet.length > 0) {
            this.displayFlashcard();
        }
    }

    switchFlashcardCategory(category) {
        if (category === 'all') {
            this.currentFlashcardSet = this.flashcards.slice();
        } else {
            this.currentFlashcardSet = this.flashcards.filter(card => card.category === category);
        }
        
        this.currentFlashcardIndex = 0;
        this.displayFlashcard();
    }

    displayFlashcard() {
        if (this.currentFlashcardSet.length === 0) return;

        const card = this.currentFlashcardSet[this.currentFlashcardIndex];
        const cardTermEl = document.getElementById('cardTerm');
        const cardDefinitionEl = document.getElementById('cardDefinition');
        const cardProgressEl = document.getElementById('cardProgress');

        if (cardTermEl) cardTermEl.textContent = card.term;
        if (cardDefinitionEl) cardDefinitionEl.textContent = card.definition;
        if (cardProgressEl) {
            cardProgressEl.textContent = `Card ${this.currentFlashcardIndex + 1} of ${this.currentFlashcardSet.length}`;
        }

        // Reset flip state
        const flashcard = document.getElementById('flashcard');
        if (flashcard) flashcard.classList.remove('flipped');
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard) flashcard.classList.toggle('flipped');
    }

    previousCard() {
        if (this.currentFlashcardIndex > 0) {
            this.currentFlashcardIndex--;
        } else {
            this.currentFlashcardIndex = this.currentFlashcardSet.length - 1;
        }
        this.displayFlashcard();
    }

    nextCard() {
        if (this.currentFlashcardIndex < this.currentFlashcardSet.length - 1) {
            this.currentFlashcardIndex++;
        } else {
            this.currentFlashcardIndex = 0;
        }
        this.displayFlashcard();
    }

    markCardDifficulty(difficulty) {
        const cardId = this.currentFlashcardSet[this.currentFlashcardIndex].term;
        
        if (!this.currentUser.flashcardProgress[cardId]) {
            this.currentUser.flashcardProgress[cardId] = {
                reviews: 0,
                difficulty: [],
                lastReviewed: null
            };
        }

        this.currentUser.flashcardProgress[cardId].reviews++;
        this.currentUser.flashcardProgress[cardId].difficulty.push(difficulty);
        this.currentUser.flashcardProgress[cardId].lastReviewed = Date.now();

        this.saveUserData();
        this.checkAchievements();
        
        // Auto-advance to next card
        setTimeout(() => this.nextCard(), 500);
    }

    // Progress and Analytics
    updateProgress() {
        this.updateProgressRings();
        this.updateDomainBars();
        this.updateHeatmap();
    }

    updateProgressRings() {
        const progressRing = document.querySelector('.progress-ring');
        if (progressRing) {
            progressRing.style.setProperty('--progress', this.currentUser.readinessScore);
        }

        const totalAnsweredEl = document.getElementById('totalAnswered');
        const accuracyRateEl = document.getElementById('accuracyRate');
        const studyTimeEl = document.getElementById('studyTime');

        if (totalAnsweredEl) totalAnsweredEl.textContent = this.currentUser.totalQuestions.toLocaleString();
        if (accuracyRateEl) accuracyRateEl.textContent = `${this.currentUser.overallScore}%`;
        
        const studyHours = Math.round(this.currentUser.totalQuestions * 1.5 / 60); // Estimate
        if (studyTimeEl) studyTimeEl.textContent = `${studyHours} hours`;
    }

    updateDomainBars() {
        const container = document.getElementById('domainBars');
        if (!container) return;

        container.innerHTML = '';

        this.domains.forEach(domain => {
            const progress = this.currentUser.domainProgress[domain.name] || 0;
            const barEl = document.createElement('div');
            barEl.className = 'domain-bar';
            barEl.innerHTML = `
                <div class="domain-bar-label">${domain.name}</div>
                <div class="domain-bar-container">
                    <div class="domain-bar-fill" style="width: ${progress}%">${Math.round(progress)}%</div>
                </div>
            `;
            container.appendChild(barEl);
        });
    }

    updateHeatmap() {
        const grid = document.getElementById('heatmapGrid');
        if (!grid) return;

        grid.innerHTML = '';
        
        // Generate last 49 days (7x7 grid)
        const today = new Date();
        for (let i = 48; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            const studyCount = this.currentUser.studyDates.filter(d => d === dateStr).length;
            const level = Math.min(4, studyCount);
            
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.setAttribute('data-level', level);
            cell.title = `${dateStr}: ${studyCount} study sessions`;
            grid.appendChild(cell);
        }
    }

    updateDashboard() {
        console.log('Updating dashboard...');
        
        // Update stats
        const totalQuestionsEl = document.getElementById('totalQuestions');
        const studyStreakEl = document.getElementById('studyStreak');
        const overallScoreEl = document.getElementById('overallScore');
        const readinessScoreEl = document.getElementById('readinessScore');

        if (totalQuestionsEl) totalQuestionsEl.textContent = this.currentUser.totalQuestions;
        if (studyStreakEl) studyStreakEl.textContent = this.currentUser.studyStreak;
        if (overallScoreEl) overallScoreEl.textContent = `${this.currentUser.overallScore}%`;
        if (readinessScoreEl) readinessScoreEl.textContent = `${this.currentUser.readinessScore}%`;

        // Update domains
        this.updateDomainsGrid();
        this.updateAchievementsGrid();
    }

    updateDomainsGrid() {
        const container = document.getElementById('domainsGrid');
        if (!container) {
            console.error('Domains grid container not found');
            return;
        }

        container.innerHTML = '';

        this.domains.forEach(domain => {
            const progress = this.currentUser.domainProgress[domain.name] || 0;
            const domainEl = document.createElement('div');
            domainEl.className = 'domain-card fade-in';
            domainEl.innerHTML = `
                <div class="domain-name">${domain.name}</div>
                <div class="domain-weight">Weight: ${domain.weight}</div>
                <div class="domain-progress-bar">
                    <div class="domain-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="domain-score">${Math.round(progress)}%</div>
                <div class="domain-topics">
                    ${domain.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
            `;
            container.appendChild(domainEl);
        });
    }

    updateAchievementsGrid() {
        const container = document.getElementById('achievementsGrid');
        if (!container) {
            console.error('Achievements grid container not found');
            return;
        }

        container.innerHTML = '';

        this.achievements.forEach(achievement => {
            const earned = this.currentUser.achievements.includes(achievement.id);
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-card ${earned ? 'earned' : ''}`;
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            container.appendChild(achievementEl);
        });
    }

    // Achievement System
    checkAchievements() {
        // Simplified achievement checking for demo
        console.log('Checking achievements...');
    }

    showAchievementNotification(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement) return;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification fade-in';
        notification.innerHTML = `
            <div class="notification-icon">${achievement.icon}</div>
            <div class="notification-content">
                <div class="notification-title">Achievement Unlocked!</div>
                <div class="notification-name">${achievement.name}</div>
                <div class="notification-desc">${achievement.description}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-bg-primary);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: var(--shadow-vibrant);
            z-index: 1000;
            max-width: 300px;
            animation: slideInRight 0.5s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // Report system
    setupReportModal() {
        const modal = document.getElementById('reportModal');
        const closeBtn = document.getElementById('closeReport');
        const cancelBtn = document.getElementById('cancelReport');
        const submitBtn = document.getElementById('submitReport');

        if (closeBtn) closeBtn.addEventListener('click', () => this.hideReportModal());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.hideReportModal());
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitReport());
    }

    showReportModal() {
        const modal = document.getElementById('reportModal');
        if (modal) modal.classList.remove('hidden');
    }

    hideReportModal() {
        const modal = document.getElementById('reportModal');
        const textArea = document.getElementById('reportText');
        
        if (modal) modal.classList.add('hidden');
        if (textArea) textArea.value = '';
    }

    submitReport() {
        const text = document.getElementById('reportText')?.value?.trim();
        if (!text) {
            alert('Please describe the issue with this question.');
            return;
        }

        // In a real app, this would send to a server
        console.log('Question report submitted:', {
            questionIndex: this.currentQuiz?.currentIndex,
            question: this.currentQuiz?.questions[this.currentQuiz.currentIndex],
            report: text,
            timestamp: new Date().toISOString()
        });

        alert('Thank you for your report! We will review this question.');
        this.hideReportModal();
    }

    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Add CSS for achievement notifications and other dynamic elements
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .achievement-notification {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .notification-icon {
        font-size: 32px;
    }

    .notification-title {
        font-weight: bold;
        margin-bottom: 4px;
    }

    .notification-name {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .notification-desc {
        font-size: 14px;
        opacity: 0.9;
    }

    .topic-tag {
        display: inline-block;
        background: rgba(255, 165, 0, 0.2);
        color: var(--color-primary);
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        margin: 2px 4px 2px 0;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing NBHWC Prep Pro...');
    window.nbhwcApp = new NBHWCPrepPro();
});