import {Component, OnInit} from '@angular/core';
import {Jira} from '../../classes/jira';
import {Issue} from '../../classes/issue';
import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import Paths from '../../constantes/paths';
import Commands from '../../constantes/commands';
import {Util} from '../../classes/util';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

    issues: Array<Issue>;
    selectedIssue: Issue;
    childProcess: typeof childProcess;
    path: typeof path;
    fs: typeof fs;

    constructor() {
    }

    async ngOnInit() {
        this.issues = await Jira.getMyOpenIssues();
        this.selectedIssue = this.issues[0];
        if (Util.isElectron()) {
            this.childProcess = window.require('child_process');
            this.path = window.require('path');
            this.fs = window.require('fs');
        }
    }

    createIssue() {
        if (Util.isElectron()) {
            if (!this.fileAlreadyExists()) {
                this.childProcess.execSync(Util.interpolate(Commands.CREATE_ISSUE_FILE, {issue: this.selectedIssue.getName()}), {
                    cwd: Paths.SCRIPTS_ISSUE_PATH
                });
                console.log('Arquivo criado com sucesso');

                this.childProcess.execSync(Util.interpolate(Commands.APPEND_ISSUE_REFERENCE, {
                    path: Paths.SCRIPTS_ROOT_PATH,
                    issue: this.selectedIssue.getName(),
                    date: Util.getFormatedDate()
                }), {cwd: Paths.SCRIPTS_ROOT_PATH});
                this.childProcess.execSync(Commands.APPEND_SLASH, {cwd: Paths.SCRIPTS_ROOT_PATH});
                console.log('Adicionado no migracao com sucesso');
            } else {
                console.log(`O arquivo ${this.selectedIssue.getName()}.sql ja existe`);
            }
        }
    }

    fileAlreadyExists() {
        if (Util.isElectron() && this.fs) {
            return this.fs.existsSync(this.path.resolve(Paths.SCRIPTS_ISSUE_PATH, this.selectedIssue.getName() + '.sql'));
        }
    }

    openIssue() {
        if (Util.isElectron()) {
            const caminho = Paths.SCRIPTS_ISSUE_PATH;
            console.log(caminho);
            this.childProcess.execSync(Util.interpolate(Commands.OPEN_ISSUE, ({issue: this.selectedIssue.getName()})), {
                cwd: Paths.SCRIPTS_ISSUE_PATH
            });
        }
    }

    changeIssue() {
        if (Util.isElectron()) {
            try {
                this.childProcess.execSync(Util.interpolate(Commands.SELECT_ISSUE, ({issue: this.selectedIssue.getName()})), {
                    cwd: Paths.SCRIPTS_ROOT_PATH
                });
            } catch (err) {
                if (/did not match any file\(s\) known to git/.test(err.message)) {
                    this.childProcess.execSync(Util.interpolate(Commands.CREATE_ISSUE, ({issue: this.selectedIssue.getName()})), {
                        cwd: Paths.SCRIPTS_ROOT_PATH
                    });
                } else {
                    throw err;
                }
            }
        }
    }

    openJIRA() {
        if (Util.isElectron()) {
            const electron = window.require('electron');
            electron.shell.openExternal(this.selectedIssue.getLink());
        }
    }

    createUniLive() {
        throw new Error('Não implementado');
    }
}
