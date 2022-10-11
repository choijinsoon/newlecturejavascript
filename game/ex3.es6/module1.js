export default function test(){
    console.log("module1.test");
}

export function test1(){
    console.log("module1.test1");
}

test1.prototype = {
    draw:function(){
        console.log("module1.prototype");
    }
}