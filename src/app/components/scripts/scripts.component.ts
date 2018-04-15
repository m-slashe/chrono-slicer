import {Component, OnInit} from '@angular/core';
import {Script} from '../../classes/script';
import {Store} from '../../classes/store';
import ace from '../../../ace/ace';
import '../../../ace/mode-javascript.js';
import '../../../ace/theme-monokai.js';

@Component({
    selector: 'app-scripts',
    templateUrl: './scripts.component.html',
    styleUrls: ['./scripts.component.scss']
})
export class ScriptsComponent implements OnInit {

    scripts: Array<Script>;
    currentScript: Script;
    store: Store;
    editor: any;

    constructor() {
    }

    ngOnInit() {
        this.store = new Store({
            configName: 'userDataSettings',
            defaults: {}
        });
        this.scripts = this.store.get('scripts') || [];
    }

    createScript() {
        this.currentScript = new Script();
        this.editor.setValue('');
    }

    saveScript() {
        let alreadyExists = false;
        for (const script of this.scripts) {
            if (script.name === this.currentScript.name) {
                alreadyExists = true;
            }
        }
        if (!alreadyExists) {
            this.scripts.push(this.currentScript);
        }
        this.store.set('scripts', this.scripts);
    }

    removeScript() {
        const index = this.scripts.indexOf(this.currentScript);
        if (index > -1) {
            this.scripts.splice(index, 1);
        }
    }

    runScript() {
        try {
            const evalIsEvil = eval;
            evalIsEvil(this.currentScript.code);
        } catch (err) {
            alert(err);
        }

    }

    changeScript() {
        if (this.currentScript) {
            setTimeout(() => {
                this.editor = ace.edit('editor');
                this.editor.setTheme('ace/theme/monokai');
                this.editor.session.setMode('ace/mode/javascript');
                this.editor.setValue(this.currentScript.code);
                this.editor.clearSelection();
                this.editor.on('change', () => {
                    this.currentScript.code = this.editor.getValue();
                });
            }, 100);
        }
    }
}
