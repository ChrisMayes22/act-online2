class Question {
    constructor(id, passage, prompt, A, B, C, D, E){
        this.id = id;
        this.flagged = false;
        this.selected = id===1;
        this.answered = false;
        this.passage = passage;
        this.content = {
            prompt,
            A,
            B,
            C,
            D,
            E: E || null
        };
        this.studentResponse = null;
    }
}

new Question(
    11,
    <PassageTwo/>,
    ``,
    <span>A.</span>,
    <span>B.</span>,
    <span>C.</span>,
    <span>D.</span>,
)