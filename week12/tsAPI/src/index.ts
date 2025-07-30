interface User {
    name: String;
    age: number;
    email: String;
    password: String;
    // password?: String; // optional value 
};

// Pick is used to pick certain set of properties to play with
type UpdateProps = Pick<User, 'name' | 'age' | 'password'>

// if we want to make them optional later, use Partial
type PropsOptional = Partial<UpdateProps>


function updateUser(updateprops: UpdateProps) {
    console.log("Updated user : ", updateprops)
}



function OptionaUpdates(updateprops: PropsOptional) {
    console.log("Updated user : ", updateprops)
}

updateUser({ name: "amulya", age: 21, password: "amulya123" });



// function sumOfage(user1: User, user2: User) {
//     return user1.age + user2.age;
// }

// const age = sumOfage({ name: 'taro', age: 20 }, { name: 'jiro', age: 30 })

// console.log(age)