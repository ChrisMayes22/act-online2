export const RECORD_STUDENT_RES = 'RECORD_STUDENT_RES';

export const recordStudentRes = function(studentRes){
    return {type: RECORD_STUDENT_RES, studentRes: studentRes}
}