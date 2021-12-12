<template>
  <q-page class="">
    <div class="row">
      <div class="col">
        <div class="q-pa-sm"></div>
        <div class="flex justify-center">EDITOR</div>
        <q-tab-panel name="editor" class="full-height">
          <codemirror
            class=""
            v-model="code"
            :options="cmOptions"
            @input="codigoEditado"
          />
        </q-tab-panel>
      </div>

      <div class="col-2">
        <div class="col row fit content-center">
          <div class="botones column content-center full-width">
            <div class="row">
              <q-btn
                push
                label="Ejecutar"
                class=""
                icon="play_arrow"
                @click="ejecutar"
              />
            </div>
            <div class="q-pa-lg"></div>
            <div class="row">
              <q-btn
                push
                label="Limpiar"
                icon="cleaning_services"
                @click="limpiar"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="q-pa-sm"></div>
        <div class="flex justify-center">CONSOLA</div>
        <q-tab-panel name="consola" class="bg-grey-10 text-white fit">
          <q-list dark bordered separator dense>
            <q-item
              clickable
              v-ripple
              v-for="(item, index) in salida"
              :key="index"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </div>
    </div>
  </q-page>
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
      code: 
`
//Declaración de constantes
const b= 'b';
console.log(b);

//Declaración de constantes de variable (any type)
locvar a  = 0;

//Declaración de funciones
function test(){

  locvar x = 0;
  locvar y = 3;
  locvar result = x + y;

  console.log('Resultado [3]: '+ result);
  //Declaración de ciclo condicional
  buclesi(y > 0){
    y--;
    result =  y + x;

    //Declaración de condicional
    porsi(y == 0){
      console.log('Ya llegue a 0');
    }
    porsiaca{
      console.log('Resultado['+y+']: '+ result);
    }
    
  } 
}
//Llamar funciones
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
    notificar(variant, message) {
      this.$q.notify({
        message: message,
        color: variant,
        multiLine: true,
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        actions: [
          {
            label: "Aceptar",
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
        this.notificar("primary", "Ejecución realizada con éxito");
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
      this.notificar(
        "negative",
        `No fue posible recuperarse de un error :(\nNo me pongan 0 por favor`
      );
      const objeto = JSON.parse(json);

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

