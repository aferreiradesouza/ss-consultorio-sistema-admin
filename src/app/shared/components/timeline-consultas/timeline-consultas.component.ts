import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Anamnese, Consulta, Paciente, ConsultasTemplatesDocumentos } from '../../interface';
import { ANAMNESE } from '../../constants/anamnese';
import * as moment from 'moment';
import { DocumentosEnum } from '../../enums/documentos.enum';
import { IMPRIMIR } from '../../constants/pdf';

@Component({
    selector: 'ngx-timeline-consultas',
    templateUrl: 'timeline-consultas.component.html',
    styleUrls: ['timeline-consultas.component.scss']
})

export class TimeLineConsultasComponent implements OnInit {

    @Input() data: any[];
    @Input() paciente: Paciente;

    constructor() { }

    ngOnInit() {
        this.paciente.consultas = this.paciente.consultas.sort((a: any, b: any): any => {
          return <any>moment(b.data).toDate() - <any>moment(a.data).toDate();
        });
        this.paciente.consultas.forEach((e: any) => {
            if (e.consultasTemplatesDocumentos.length) {
                e.consultasTemplatesDocumentos = this.formatarTemplates(e.consultasTemplatesDocumentos);
            }
        });
    }

    getAnamnesia(consultaAnamnese: Anamnese) {
        let _anamnese = Object.keys(consultaAnamnese);
        _anamnese = _anamnese.filter(element => {
            return consultaAnamnese[element];
        });
        const arr = ANAMNESE;
        const lista = [];
        arr.forEach(f => {
            const filhos = [];
            f.children.forEach(c => {
                if (_anamnese.indexOf(c.control) > -1) {
                    filhos.push({...c, value: consultaAnamnese[c.control]});
                }
            });
            if (filhos.length) {
                const novoObj = {
                    title: f.title,
                    children: filhos,
                };
                lista.push(novoObj);
            }
        });
        return lista;
    }

    formatarTemplates(templates: ConsultasTemplatesDocumentos[]) {
        if (!templates.length) { return; }
        const novoArr: Array<{titulo: number, templates: ConsultasTemplatesDocumentos[]}> = [];
        templates.forEach((e, i) => {
            if (i === 0) {
                const obj = {
                    titulo: e.tipoTemplate,
                    templates: []
                };
                obj.templates.push(e);
                novoArr.push(obj);
            } else {
                const ind = novoArr.map(m => m.titulo).indexOf(e.tipoTemplate);
                if (ind > -1) {
                    novoArr[ind].templates.push(e);
                } else {
                    const obj = {
                        titulo: e.tipoTemplate,
                        templates: []
                    };
                    obj.templates.push(e);
                    novoArr.push(obj);
                }
            }
        });
        return novoArr;
    }

    obterNomeDocumento(num: number) {
        return DocumentosEnum.obterDescricao(num);
    }

    printDoc(html: string) {
        const popupWin = window.open('', '_blank', `width=${IMPRIMIR.width},height=${IMPRIMIR.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write('<html><title>Documento</title></head><body onload="window.print()">');
        popupWin.document.write(html);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    formatarData(data: string) {
        return moment(data).format('DD/MM/YYYY');
    }
}
