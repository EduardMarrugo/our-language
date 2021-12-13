<template>
  <div class="">
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-md-6 col-12 q-pa-md">
            <q-card id="editor">
              <q-card-section style="height: 40px">
                <div class="row">
                  <div class="col-9">
                    <div class="text-h6">{{ $t("editor") }}</div>
                  </div>

                  <div class="col-3">
                   
                      <q-btn push rounded justify="end" @click="scrollView">
                        {{ $t("ej") }}
                      </q-btn>
               
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <codemirror
                  v-model="code"
                  :options="cmOptions"
                  @input="codigoEditado"
              /></q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-12 q-pa-md">
            <q-card
              class="bg-black text-white q-mb-md"
              style="height: 569px"
              id="console"
            >
              <q-card-section style="height: 40px">
                <div class="text-h6">{{ $t("consola") }}</div>
              </q-card-section>
              <q-scroll-area class="fit">
                <q-card-section class="q-pa-lg">
                  <q-list dark dense class="q-pa-md">
                    <q-item
                      clickable
                      v-ripple
                      v-for="(item, index) in salida"
                      :key="index"
                    >
                      <q-item-section>{{ item }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-scroll-area>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-pa-md">
            <q-card
              class="bg-white text-black"
              style="height: auto"
              id="ejemplo"
            >
              <q-card-section>
                <div class="text-h6">{{ $t("ej") }}</div>
              </q-card-section>
              <q-card-section class="q-pa-md">
                //{{ $t("dec_const") }} <br />
                const b = 'b';<br />

                //{{ $t("dec_variable") }}<br />
                locvar a = 0;<br />

                //{{ $t("esc_consola") }}<br />
                escribe.consola(b);<br />

                //{{ $t("dec_funct") }}<br />
                function test(){<br />

                locvar x = 0;<br />
                locvar y = 3;<br />
                locvar result = x + y;<br />

                escribe.consola('Resultado [3]: '+ result);<br />

                repetidor(locvar i=0;i<3;i++){<br />
                escribe.consola('repetidor');<br />
                }<br />

                //{{ $t("dec_ciclos") }}<br />
                buclesi(y > 0){<br />

                y--;<br />
                result = y + x;<br />

                //{{ $t("dec_condicional") }}<br />
                porsi(y == 0){ <br />
                escribe.consola('Ya llegue a 0');<br />
                }<br />
                porsiaca{ <br />
                escribe.consola('Resultado['+y+']: '+ result);<br />
                } }<br />
                }<br />
                function sumar(x:number, y:number){<br />
                escribe.consola('Funcion con parametros: '+ x + ' y ' + y);<br />
                devuelve (x+y);<br />
                }<br />
                escribe.consola('Funcion sumar devuelve: '+sumar(1,2));<br />
                //{{ $t("llamar_func") }}<br />
                test();
              </q-card-section>

              <!-- <q-card-section>
                <q-table
                  title="Lista de Errores Obtenidos"
                  :data="errores"
                  :columns="columns"
                  row-key="name"
                  dark
                  color="amber"
                  dense
                  :pagination="{ rowsPerPage: 0 }"
                  rows-per-page-label="Errores por página"
                />
              </q-card-section> -->
            </q-card>
          </div>
        </div>
      </q-page>
      <q-page-sticky position="bottom-right" :offset="[10, 80]">
        <q-btn
          push
          fab
          icon="play_arrow"
          color="red"
          @click="ejecutar"
          href="#console"
        >
          <q-tooltip> Ejecutar </q-tooltip>
        </q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[10, 150]" href="#editor">
        <q-btn push fab icon="cleaning_services" color="blue" @click="limpiar">
          <q-tooltip> Limpiar </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </q-page-container>
  </div>
</template>

<script>
//JS-Beautify
var beautify_js = require("js-beautify").js_beautify;
// CodeMirror
import { codemirror } from "vue-codemirror";
// import base style
import "codemirror/lib/codemirror.css";
// import theme style
import "codemirror/theme/paraiso-light.css";
// import language js
import "codemirror/mode/javascript/javascript.js";
// Analizador
import AnalizadorTraduccion from "../analizador/gramatica_traduccion";
//Traduccion
import { Traduccion } from "../traduccion/traduccion";
import { Variable } from "../traduccion/variable";
import { Ejecucion } from "../ejecucion/ejecucion";
import { Errores } from "../arbol/errores";
import { Error as InstanciaError } from "../arbol/error";
import { Entornos } from "../ejecucion/entornos";
import { EntornoAux } from "../ejecucion/entorno_aux";

export default {
  components: {
    codemirror,
    ast: require("../components/Ast").default,
    tablaSimbolos: require("../components/TablaSimbolos").default,
  },
  data() {
    return {
      code: `
const b = 'b';

locvar a  = 0;

escribe.consola(b);

function test(){

  locvar x = 0;
  locvar y = 3;
  locvar result = x + y;

  escribe.consola('Resultado [3]: '+ result);

  repetidor(locvar i=0;i<3;i++){
    escribe.consola('repetidor');
  }

  buclesi(y > 0){

    y--;
    result =  y + x;

    porsi(y == 0){
      escribe.consola('Ya llegue a 0');
    }
    porsiaca{
      escribe.consola('Resultado['+y+']: '+ result);
    }
    
  } 


}

function sumar(x:number, y:number){
  escribe.consola('Funcion con parametros: '+ x + ' y ' + y);
  devuelve (x+y);
}

escribe.consola('Funcion sumar devuelve: '+sumar(1,2));

test();
`,
      cmOptions: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/javascript",
        theme: "paraiso-light",
        lineNumbers: true,
        line: false,
      },
      output: "salida de ejemplo",
      tab: "editor",
      dot: "",
      salida: [],
      errores: [],
      columns: [
        { name: "tipo", label: "Tipo", field: "tipo", align: "left" },
        { name: "linea", label: "Linea", field: "linea", align: "left" },
        {
          name: "descripcion",
          label: "Descripcion",
          field: "descripcion",
          align: "left",
        },
      ],
      entornos: [],
    };
  },
  methods: {
    scrollView() {
      document.getElementById('ejemplo').scrollIntoView()
    },
    notificar(variant, message) {
      this.$q.notify({
        message: message,
        color: variant,
        multiLine: true,
        // avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        actions: [
          {
            label: "OK",
            color: "yellow",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
    traducir() {
      if (this.code.trim() == "") {
        this.notificar("primary", `Ingrese algo de código, por favor`);
        return;
      }
      this.inicializarValores();
      try {
        const raizTraduccion = AnalizadorTraduccion.parse(this.code);
        //Validación de raiz
        if (raizTraduccion == null) {
          this.notificar(
            "negative",
            "No fue posible obtener la raíz de la traducción"
          );
          return;
        }
        let traduccion = new Traduccion(raizTraduccion);
        this.dot = traduccion.getDot();
        const codigoNuevo = traduccion.traducir();
        Entornos.getInstance().clear();
        // this.code = codigoNuevo;
        this.code = beautify_js(codigoNuevo, { indent_size: 2 });
        this.notificar("primary", "Traducción realizada con éxito");
      } catch (error) {
        this.notificar("negative", JSON.stringify(error));
      }
      this.errores = Errores.getInstance().lista;
    },
    ejecutar() {
      if (this.code.trim() == "") {
        this.notificar("primary", `Ingrese algo de código, por favor`);
        return;
      }
      this.inicializarValores();
      try {
        const raiz = AnalizadorTraduccion.parse(this.code);
        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        let ejecucion = new Ejecucion(raiz);
        this.dot = ejecucion.getDot();
        //Valido si puedo ejecutar (no deben existir funciones anidadas)
        if (!ejecucion.puedoEjecutar(raiz)) {
          this.notificar(
            "primary",
            "No se puede realizar una ejecución con funciones anidadas"
          );
          return;
        }
        ejecucion.ejecutar();
        // ejecucion.imprimirErrores();
        this.salida = ejecucion.getSalida();
        console.log(this.salida);

        this.notificar("blue", this.$t('ejecucion_bien'));
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      this.entornos = Entornos.getInstance().lista;
    },
    inicializarValores() {
      Errores.getInstance().clear();
      Entornos.getInstance().clear();
      this.errores = [];
      this.entornos = [];
      this.salida = [];
      this.dot = "";
    },
    validarError(error) {
      const json = JSON.stringify(error);
      const objeto = JSON.parse(json);

      this.notificar(
        "negative",
        `Error, verificar codigo.
      ${objeto.hash.loc.first_line} : ${objeto.hash.loc.last_column}`
      );

      if (
        objeto != null &&
        objeto instanceof Object &&
        objeto.hasOwnProperty("hash")
      ) {
        Errores.getInstance().push(
          new InstanciaError({
            tipo: "sintactico",
            linea: objeto.hash.loc.first_line,
            descripcion: `No se esperaba el token: "${objeto.hash.token}" en la columna ${objeto.hash.loc.last_column}, se esperaba uno de los siguientes: ${objeto.hash.expected}`,
          })
        );
      }
    },
    codigoEditado(codigo) {
      this.inicializarValores();
    },
    limpiar() {
      this.code = "";
      this.inicializarValores();
    },
  },
};
</script>

<style lang="css">
.CodeMirror {
  height: 500px;
}
</style>

<!-- <q-card-section>
                <q-table
                  title="Lista de Errores Obtenidos"
                  :data="errores"
                  :columns="columns"
                  row-key="name"
                  dark
                  color="amber"
                  dense
                  :pagination="{ rowsPerPage: 0 }"
                  rows-per-page-label="Errores por página"
                />
              </q-card-section> -->
