import React from 'react';
import { Text } from '@chakra-ui/react';

const StudentList = ({ students }) => {
  if (!students || students.length === 0) {
    return <Text>No students enrolled</Text>;
  }

  return (
    <>
      {students.map(student => (
        <Text key={student.id}>{student.username}</Text>
      ))}
    </>
  );
};

export default StudentList;
