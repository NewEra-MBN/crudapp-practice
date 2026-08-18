// const pick = (obj, keys) => {
//     const result = keys.reduce(function(acc, key) {
//         console.log('current box', acc)
//         console.log('curent key', key)

import { resolve } from "node:dns";

//         acc[key] = obj[key]
//         return acc
//     },{})

//     return result
// }


// const result = pick(student, ["name", "marks"])

// console.log(result)


// const array = ['age']
// const user = {
//     name : 'kamal',
//     age: 22
// }

// function exclude  (obj, keys) {
//     for(const key of keys){
//         delete(obj[key])
//     }

//     console.log(obj)
// }


// exclude(user, array)




// const keys = ['name', 'password']


// const checkReduce = keys.reduce(function(obj, key){
//     return{
//         ...obj,
//      [key]: true
//     }
// },{})

// const user = {
//     name: 'kamal',
//     age: 22,
//     city: 'sylhet',
//     password: 'sfjs2834'
// }



// const exclude = (obj, keys) => {
//     for(const key of keys) {
//         delete obj[key]
//     }

//     return obj
// }


// console.log(exclude(user, keys))


// import moment from 'moment'

// console.log(moment)
// console.log('here is the default',moment().format());  
// console.log(moment().format("YYYY-MM-DD"));
// console.log(moment().format("hh:mm:ss A"));



// const start = moment("2026-01-01");
// const end = moment("2026-07-30");

// console.log(end.diff(start, "days"));     // difference in days
// console.log(end.diff(start, "months"));   // difference in months
// console.log(end.diff(start, "hours"));    // difference in hours




// import Joi from 'joi'

// const schema = Joi.object({
//   role: Joi.string().valid("admin", "user").required()
// });


// const {error} = schema
// .validate({})

// console.log(error)




// ///////// 

// const allRoles = {
//     admin: ["manageUsers", "deleteUsers"],
//     user: ["read"],
//     guest: ["view"]
// }

// const roles = Object.keys(allRoles)

// const getEntries =new Map(Object.entries(allRoles))


// console.log(getEntries)



// const allRoles = {
//   admin: ["manageUsers"],
//   user: ["read"]
// }

// const getEntries = new Map(Object.entries(allRoles))

// console.log(allRoles['constructor'])
// console.log(getEntries.has('constructor'))


// if(true && false) {
//     console.log('hello world')
// }


// if(false && true){
//     console.log('hello world')




// const arr = ['kamal', 'jamal', 'shamim']

// const result = arr.reduce((acc, current) => (
//     {
//         ...acc,
//         [current] : false
//     }
// ),{})

// console.log(result)


// import pkg from 'moment';
// const moment = pkg;

// console.log(moment().add(10, 'minutes').unix())













// export function add(a, b) {
//     return a + b;
// }





// export default function devide(a,b){
//     if(b === 0) return 'cannot devide by zero'
//     return a / b;
// }


// export default async function getUser(id) {
//     return new Promise((resolve, reject) =>{
//         setTimeout(() => {
//             if(id === 1){
//                 resolve({id:1, name:'kamal'})
//             }else{
//                 reject("no data available")
//             }
//         },2000)
//     })
// }




// const authService = {
//     generateToken() {
//         return "token";
//     },
//     async saveToken(id) {
//         const token = generateToken();
//         console.log('token saved in db');
//         return { status: "token saved Successfully" };
//     },

//     async getUserByEmail(email) {
//         return { success: true, message: "This user is available" };
//     },

//     async loginUser(email, password) {
//         const user = await this.getUserByEmail(email);

//         if (email === "x@mail.com" && password === "abcde") {
//             await this.saveToken(1);
//             return { status: "user login successfully" };
//         } else {
//             return Promise.reject("failed");
//         }
//     }
// };

// export default authService;




const userService = {
    callTheUser(name) {
        return 'Good Morning' + name
    },
    async getTheUser(id) {
        return new Promise(resolve => {
            setTimeout(()=> {
                if(id === 1){
                    resolve('Kamal')
                }
            }, 2000)
        })
    },
    async greeting(id){
        const user = await this.getTheUser(id);
        this.callTheUser(user)
        return {user: user,status: "success"}
    }
}
export default userService;



