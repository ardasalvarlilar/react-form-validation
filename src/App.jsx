
import { useState, useRef } from 'react'
function App() {
  const nameRef = useRef()
  const surnameRef = useRef()
  const mailRef = useRef()
  const passwordRef = useRef()
  const confPassRef = useRef()
  
  const confPassInputRef = useRef()
  const passwordInputRef = useRef()
  const emailInputRef = useRef()
  const nameInputRef = useRef()
  const surnameInputRef = useRef()


  const [person, setPerson] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confPass: null,
  })

  function handleSubmit(){
    console.log(person)
    if(person.password !== null){
      checkPasswordRequirements(6,20)
    }else{
      showError([passwordRef,confPassRef], 'password should not leave blank')
    }
    if(person.email !== null){
      checkEmail()
    }else{
      showError([mailRef], 'mail should not leave blank')
    }

    if(person.name !== null){

      checkName()
    }else{
      showError([nameRef,surnameRef], 'name should not leave blank')
    }

    if(person.surname !== null){
      checkSurname()
    }else{
      showError([surnameRef], 'surname should not leave blank')
    }
  }

  // function showError(inputSpan, message){
  //   inputSpan.current.className = "mt-0.5 text-red-700 text-xs block"
  //   inputSpan.current.textContent = message
  //   setTimeout(() => {
  //     inputSpan.current.className = "mt-0.5 text-red-700 text-xs hidden"
  //     inputSpan.current.textContent = ''
  //   }, 3000);
  // }

  function showError([...args], message){
    args.forEach(arg => {
      arg.current.className = "mt-0.5 text-red-700 text-xs block"
      arg.current.textContent = message

      setTimeout(() => {
        arg.current.className = "mt-0.5 text-red-700 text-xs hidden"
        arg.current.textContent = ''
      }, 3000);
    })
  }

  function showSuccess(...args){
    args.forEach(arg => {
      arg.current.className = 'bg-green-200 p-3 rounded-md border border-green-400 focus:outline-none'
    })
  }

  function checkPasswordEquality(){
    if(person.password === person.confPass){
      showSuccess(passwordInputRef,confPassInputRef)
    }else{
      showError([confPassRef], 'passwords did not matched')
    }
  }

  function checkPasswordRequirements(min,max){
    if(person.password.includes(person.name)){
      showError([passwordRef], 'password should not contains your name')
    }else if(person.password.length > max){
      showError([passwordRef], 'password is too long')
    }else if(person.password.length < min){
      showError([passwordRef], 'password is too short')
    }else{
      checkPasswordEquality()
    }
  }

  function checkEmail(){
    if(person.email !== null){
      if(!person.email.includes('@') && !person.email.endsWith('.com')){
        showError([mailRef],'invalid email')
      }else{
        showSuccess(emailInputRef)
      }
    }else{
      showError([mailRef], 'mail can not leave blank')
    }
  }
    

  function checkName(){
    if(nameInputRef.current.value === ''){
      showError(nameRef, 'enter your name')
    }else{
      showSuccess(nameInputRef)
    }
  }
  function checkSurname(){
    if(surnameInputRef.current.value === ''){
      showError(surnameRef, 'enter your surname')
    }else{
      showSuccess(surnameInputRef)
    }
  }

  return (
    <div className=' h-screen bg-lime-300 flex justify-center items-center'>
      <div className=' w-96 p-12 bg-white rounded-md flex flex-col gap-7 shadow-2xl'>

        <div className=' flex flex-col'>
          <input 
            ref={nameInputRef}
            type='text'
            placeholder='John'
            className='bg-zinc-100 p-3 rounded-md border border-zinc-300 focus:outline-none'
            onChange={(e) => setPerson({...person, name: e.target.value})}
          />
          <span ref={nameRef} className='mt-0.5 text-red-700 text-xs hidden'>Err</span>
        </div>

        <div className=' flex flex-col'>
          <input
            ref={surnameInputRef}
            type='text'
            placeholder='Doe'
            className='bg-zinc-100 p-3 rounded-md border border-zinc-300 focus:outline-none'
            onChange={(e) => setPerson({...person, surname: e.target.value})}
          />
          <span ref={surnameRef} className='mt-0.5 text-red-700 text-xs hidden'>Err</span>
        </div>

        <div className=' flex flex-col'>
          <input
            ref={emailInputRef}
            type='email'
            placeholder='johndoe@example.com'
            className='bg-zinc-100 p-3 rounded-md border border-zinc-300 focus:outline-none'
            onChange={(e) => setPerson({...person, email: e.target.value})}
          />
          <span ref={mailRef} className='mt-0.5 text-red-700 text-xs hidden'>Err</span>
        </div>

        <div className=' flex flex-col'>
          <input 
            ref={passwordInputRef}
            type='password'
            placeholder='password'
            className='bg-zinc-100 p-3 rounded-md border border-zinc-300 focus:outline-none'
            onChange={(e) => setPerson({...person, password: e.target.value})}
          />
          <span ref={passwordRef} className='mt-0.5 text-red-700 text-xs hidden'>Err</span>
        </div>


        <div className=' flex flex-col'>
          <input 
            ref={confPassInputRef}
            type='password'
            placeholder='confirm password'
            className='bg-zinc-100 p-3 rounded-md border border-zinc-300 focus:outline-none'
            onChange={(e) => setPerson({...person, confPass: e.target.value})}
          />
          <span ref={confPassRef} className='mt-0.5 text-red-700 text-xs hidden'>Err</span>
        </div>

        <button onClick={handleSubmit} className='bg-lime-600 text-white p-3 rounded-md'>Register</button>
      </div>
    </div>
  )
}

export default App
