// Import Alpine.js
import Alpine from 'alpinejs';

// Initialize Alpine.js
window.Alpine = Alpine;

// Define the quiz application
document.addEventListener('alpine:init', () => {
    Alpine.data('quiz', () => ({
        darkMode: localStorage.theme === 'dark',
        categories: [
            { id: 'any', name: 'Any Category' },
            { id: '9', name: 'General Knowledge' },
            { id: '10', name: 'Entertainment: Books' },
            { id: '11', name: 'Entertainment: Film' },
            { id: '12', name: 'Entertainment: Music' },
            { id: '13', name: 'Entertainment: Musicals & Theatres' },
            { id: '14', name: 'Entertainment: Television' },
            { id: '15', name: 'Entertainment: Video Games' },
            { id: '16', name: 'Entertainment: Board Games' },
            { id: '17', name: 'Science & Nature' },
            { id: '18', name: 'Science: Computers' },
            { id: '19', name: 'Science: Mathematics' },
            { id: '20', name: 'Mythology' },
            { id: '21', name: 'Sports' },
            { id: '22', name: 'Geography' },
            { id: '23', name: 'History' },
            { id: '24', name: 'Politics' },
            { id: '25', name: 'Art' },
            { id: '26', name: 'Celebrities' },
            { id: '27', name: 'Animals' },
            { id: '28', name: 'Vehicles' },
            { id: '29', name: 'Entertainment: Comics' },
            { id: '30', name: 'Science: Gadgets' },
            { id: '31', name: 'Entertainment: Japanese Anime & Manga' },
            { id: '32', name: 'Entertainment: Cartoon & Animations' }
        ],
        difficulties: [
            { id: 'any', name: 'Any Difficulty' },
            { id: 'easy', name: 'Easy' },
            { id: 'medium', name: 'Medium' },
            { id: 'hard', name: 'Hard' }
        ],
        types: [
            { id: 'any', name: 'Any Type' },
            { id: 'multiple', name: 'Multiple Choice' },
            { id: 'boolean', name: 'True / False' }
        ],
        selectedCategory: 'any',
        selectedDifficulty: 'any',
        selectedType: 'any',
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        showResults: false,
        isLoading: false,
        shuffledAnswers: [],
        selectedAnswer: null,

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.theme = this.darkMode ? 'dark' : 'light';
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        async startQuiz() {
            this.isLoading = true;
            let apiUrl = 'https://opentdb.com/api.php?amount=15';
            if (this.selectedCategory !== 'any') apiUrl += `&category=${this.selectedCategory}`;
            if (this.selectedDifficulty !== 'any') apiUrl += `&difficulty=${this.selectedDifficulty}`;
            if (this.selectedType !== 'any') apiUrl += `&type=${this.selectedType}`;
            
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                this.questions = data.results;
                this.currentQuestionIndex = 0;
                this.score = 0;
                this.showResults = false;
                this.shuffleAnswers();
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                this.isLoading = false;
            }
        },

        shuffleAnswers() {
            if (this.questions.length === 0) return;
            const currentQuestion = this.questions[this.currentQuestionIndex];
            const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
            this.shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            this.selectedAnswer = null;
        },

        checkAnswer(answer) {
            this.selectedAnswer = answer;
            if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
                this.score++;
            }
        },

        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.shuffleAnswers();
            } else {
                this.showResults = true;
            }
        },

        getProgressPercentage() {
            return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        }
    }));
});

// Initialize Alpine
Alpine.start();