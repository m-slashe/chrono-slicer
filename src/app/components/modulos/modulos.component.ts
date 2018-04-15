import {Component, OnInit} from '@angular/core';
import {Modulo} from '../../classes/modulo';
import Paths from '../../constantes/paths';
import Commands from '../../constantes/commands';
import {Util} from '../../classes/util';

declare var fancytree: any;

@Component({
    selector: 'app-modulos',
    templateUrl: './modulos.component.html',
    styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

    modulos: Array<Modulo>;

    constructor() {
    }

    ngOnInit() {
        this.modulos = this.loadModulos();
        const tree = fancytree.createTree('#tree', {
            extensions: ['edit'],
            source: [
                {title: 'src', folder: true},
                {title: 'webpack.config.js'},
                {title: 'karma.conf.js'},
                {title: 'package.json'},
                {title: '.gitignore'}
            ]
        });
    }

    loadModulos() {
        const modulos = [];
        if (Util.isElectron()) {
            const child_process = window.require('child_process');
            const {readdirSync, statSync} = window.require('fs');
            const {resolve, join} = window.require('path');


            const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
            for (const dir of dirs(Paths.MODULOS_PATH)) {
                const modulo = new Modulo();
                const pkg = window.require(resolve(Paths.MODULOS_PATH, dir, 'package.json'));
                modulo.name = pkg.name;
                modulo.branch = child_process.execSync(Commands.GET_BRANCH_NAME, {cwd: resolve(Paths.MODULOS_PATH, dir)});
                modulos.push(modulo);
            }
        }
        return modulos;
    }

}
