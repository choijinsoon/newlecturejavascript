import context from "./itemContext.js";
import f1 from './testmodule.js';

context.items.push(3);
f1();


// class Exam{
//     constructor(kor = 1, eng = 2, math = 3){
//         this.#kor = kor;
//         this.#eng = eng;
//         this.#math = math;

//     }
//     total(){
//         return this.#kor+this.#eng+this.#math;
//     }
//     avg(){
//         return this.total()/3;
//     }

//     #kor;
//     #eng;
//     #math;
// }

// class NewlecExam extends Exam{
//     constructor(kor=0,eng=0,math=0,com=0){
//         super(kor,eng,math);
//         this.#com = com;
//     }
//     total(){
//         return super.total()+this.#com;
//     }

//     #com;
// }

// let exam = new NewlecExam(1,1,1,1);
// console.log(exam.avg());