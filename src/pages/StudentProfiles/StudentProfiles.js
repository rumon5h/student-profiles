import React, { useEffect, useState } from 'react';

const StudentProfiles = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students)
        console.log(data.students);
      })
  }, [])
  return (
    <div className='bg-[#f5f5f5]'>
      <div className='grid bg-white gap-6 grid-cols-1 p-11 justify-center items-center'>
      {
        students?.map((student, index) => <div 
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