// type Fruit = 'apple' | 'banana' | 'orange'

// function pickFruit <F extends Fruit> (
//     fruits: F[] = ['apple','kamal', 'banana', 'orange'] as F[]
// ) {
//     console.log(fruits)
// }






// const exclude = <Type, Key extends keyof Type>(obj : Type, keys: Key[]) : Omit<Type, Key> => {
//         for (const key of keys) {
//             delete obj[key];
//         }
//         return obj
// };

// export default exclude


// type User = {
//     id : number,
//     name : string,
//     password: string
// }



// type safeUser = Omit<User, "password">


// pick




// type PublicUser = Pick<User, "id"|"email">

// type safeUser = Omit<User, "password">

// const keys: (keyof User)[] = ["id", "password"]





const nums: MyArray<number> = [1, 2, 3];
const names: MyArray<string> = ["Mon", "Aki"];
const User: MyArray<{name: string, age: number}> = [
  {name: 'kamal', age: 22}
]



interface Box<T> {
  items: T[]
}



const numberArray:Box<number> = {
  items: [1, 2, 3, 4, 5]
}




interface User {
  name: string, 
  age: number,
  id: number
}


// type MyArray<Key extends keyof User> = Key[]

// const arr: MyArray = ["name"]



type MyArray<Key extends keyof User> = Key[]

const arr: MyArray<"age"> = ["age"]



function getKeys<Key extends keyof User>(
  keys: Key[] = [
    "age","id", "name"
  ] as Key[]
) {
  return keys;
}


const a = getKeys(['age'])

console.log(mom)