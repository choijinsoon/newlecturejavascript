import context from "./itemContext.js";
import f1 from './testmodule.js';

function getData(callback){
    callback({kor:10, eng:20, math:30});
}
function getList(){
    return new Promise(function(resolve, reject){
        let list = [];
        getData(function(data){
            list.push(data);

            if(data.kor == undefined)
                reject(1);

            resolve(list);
        });
    });
}

getList()
.then(list=>list[0], state=>{console.log(`오류코드 : ${state}`)})
.then(exam=>{
    exam.kor += 10;
    exam.eng += 20;
    return exam;
})
.then(exam=>{
    console.log(exam);
})

console.log("작업완료");


// context.items.push(3);
// f1();


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