import React, { useEffect, useState } from 'react';

const StudentProfiles = () => {

  const [students, setStudents] = useState([]);
  const [searchedStudents, setSearchedStudent ] = useState([]);

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students);
        setSearchedStudent(data.students);
        console.log(data.students);
      })
  }, []);

  const handleSearchStudent = () =>{
    const search = document.getElementById('search').value;
    console.log(search);
    
    const rest = students.filter(student => student.firstName.toLowerCase().includes(search) || student.lastName.toLowerCase().includes(search) );
    setSearchedStudent(rest)
    console.log(rest);
  }

  return (
    <div className='bg-[#f5f5f5]'>
      <div className='grid bg-white gap-6 grid-cols-1 p-11 justify-center items-center'>

       
          <input 
          onChange={handleSearchStudent}
          type="text" className='bg-gray-50 h-16 text-2xl border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white' 
          placeholder='Search by name'
          name="search" id="search" />
        
     
        {
          searchedStudents?.map((student, index) => <div
            key={student.id}
            className='flex pl-3 items-center gap-4'
          >

            <div className='bg-slate-50 border-4 rounded-full p-16'>
              <img className='w-40' src={student.pic} alt="" />
            </div>
            <div>
              <h1 className='text-4xl uppercase mb-3'>{student.firstName} {student.lastName}</h1>
              <p className='text-2xl mb-2 ml-5'>Email: {student.email}</p>
              <p className='text-2xl mb-2 ml-5'>Company: {student.company}</p>
              <p className='text-2xl mb-2 ml-5'>Skill: {student.skill}</p>
              <p className='text-2xl mb-2 ml-5'>Average: {
                student?.grades.reduce(
                  (previousValue, currentValue) => +previousValue + +currentValue)
              }%</p>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default StudentProfiles;