export class SurveyReply {
    constructor(
        organization, 
        contact, 
        questionReplyArray
    ) {
        this.organization = organization;
        this.contact = contact;
        this.questionReplyArray = questionReplyArray;
    }
}