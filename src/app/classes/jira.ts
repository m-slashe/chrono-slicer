import {Issue} from './issue';

export class Jira {

    static async getMyOpenIssues() {
        return [new Issue('ISSUE-1'), new Issue('ISSUE-2'), new Issue('ISSUE-3')];
    }

}
