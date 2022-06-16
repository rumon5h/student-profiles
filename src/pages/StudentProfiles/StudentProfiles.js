import React, { useEffect, useState } from 'react';

const StudentProfiles = () => {

  const [students, setStudents] = useState([]);
  const [searchedStudents, setSearchedStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students);
        setSearchedStudent(data.students);
      })
  }, []);

  const handleSearchStudent = () => {
    const search = document.getElementById('search').value.toLowerCase();

    const rest = students.filter(student => student.firstName.toLowerCase().includes(search) || student.lastName.toLowerCase().includes(search));
    setSearchedStudent(rest)

  }

  const handleToggleButtonEvent = (id) => {
    console.log(id);
    if (!selectedStudent) {
      const selectedStudent = students.find(student => student.id === id);
      if (selectedStudent) {
        setSelectedStudent(selectedStudent);
      }
    }
   else if(selectedStudent){
      setSelectedStudent(null)
    }

  }
  console.log(selectedStudent);

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
            className='flex justify-between items-start pl-3  gap-4'
          >

            <div className='flex flex-row flex-wrap '>
              <div className='  '>
                <img className='w-60 bg-slate-50 border-4 rounded-full' src={student.pic} alt="" />
              </div>
              <div className='mt-3 lg:mt-0'>
                <h1 className='text-4xl uppercase mb-3'>{student.firstName} {student.lastName}</h1>
                <p className='text-2xl mb-2 ml-5'>Email: {student.email}</p>
                <p className='text-2xl mb-2 ml-5'>Company: {student.company}</p>
                <p className='text-2xl mb-2 ml-5'>Skill: {student.skill}</p>
                <p className='text-2xl mb-2 ml-5'>Average: {
                  student?.grades.reduce(
                    (previousValue, currentValue) => +previousValue + +currentValue)
                }%</p>
                {
                  selectedStudent?.id ===  student.id && selectedStudent.grades?.map((grade, index) => <div
                    key={index}
                  >
                    <p className='text-xl'>test  {index + 1} <span className='ml-5'> {grade}%</span></p>
                  </div>)
                }

              </div>
            </div>
            <div onClick={() => handleToggleButtonEvent(student.id)}>
              {
                selectedStudent?.id === student.id ?  <button className='text-7xl text-gray-700'>&#8722;</button> : <button className='text-7xl text-gray-700'>&#43;
                </button>
              }
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default StudentProfiles;