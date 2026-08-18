import devide from "./practice";
import getUser from "./practice"


// test('should error when deviding by zero', ()=> {
//     expect(devide(10,0)).toBe(2)
// })




// test('should fetch user correctly', async()=>{
//     const user = await getUser(2)
//     expect(user.name).toBe("tamal")
// })








// import services from './practice'



// jest.spyOn(services.emailService, 'sendWelcomeEmail').mockImplementation(()=>{
//     return Promise.resolve({success: true})
// })

// test('should register user and send welcome email', async() => {
//     const fakeUser = {name:'abdule', email: "mail@mail.com"}
//     const response = await services.registerUser(fakeUser);

//     expect(response.status).toBe("User Registered Successfully!");
//     expect(services.emailService.sendWelcomeEmail).toHaveBeenCalled();
//     expect(services.emailService.sendWelcomeEmail).toHaveBeenCalledWith(fakeUser.email)
// })


// import { jest, test, expect } from '@jest/globals';
// import authService from './practice'


// jest.spyOn(authService, 'getUserByEmail').mockImplementation(() => {
//     return Promise.resolve({success: true})
// })

// jest.spyOn(authService, "saveToken").mockImplementation(() => {
//     return Promise.resolve({success: true})
// })



// test('should login user and generate and save token', async() => {
//     const response = await authService.loginUser("x@mail.com","abcde");
    
//     expect(response.status).toBe("user login successfully")
//     expect(authService.saveToken).toHaveBeenCalled()
//     expect(authService.saveToken).toHaveBeenCalledWith(1);
//     expect(authService.getUserByEmail).toHaveBeenCalled();
//     expect(authService.getUserByEmail).toHaveBeenCalledWith("x@mail.com")
// })


import {jest, test, expect} from '@jest/globals'

import userService from "./practice";

jest.spyOn(userService, "callTheUser").mockImplementation(()=> {
    return "user called"
})


test('getThe User return Kamal', async () => {
    const user = await userService.getTheUser(1)
    expect(user).toBe('Kamal')
})

test('should get the user with Id && should call the user',async ()=> {
    const response = await userService.greeting(1)
    expect(response.user).toBe("Kamal");
    expect(userService.callTheUser).toHaveBeenCalled()
    expect(userService.callTheUser).toHaveBeenCalledWith("Kamal")
})