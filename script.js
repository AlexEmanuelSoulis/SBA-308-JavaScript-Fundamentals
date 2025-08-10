// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

 

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  
  // Dates
  const currentDate = new Date();

// Past Assignment 
  const assignmentAlreadyDue = [];
  if(course.id !==  ag.course_id){
          return [];
      }else{
        for(const a of ag.assignments){
          const dueDate = new Date(a.due_at);
          if(dueDate <= currentDate && a.points_possible > 0){
            assignmentAlreadyDue.push({ 
              id: a.id, 
              dueDate, 
              pointsPossible: a.points_possible}
            );
            }
        }
      }
  
  // Submission
      const metaByID = {};
      for(const a of assignmentAlreadyDue){
        metaByID[a.id]  =  a;
      }

      const objLearnerSubmission = {};
      for(const s of submissions){
        if(!metaByID[s.assignment_id]){
          continue;
        }
          if(!objLearnerSubmission[s.learner_id]){
            objLearnerSubmission[s.learner_id] = [];   
          }
          objLearnerSubmission[s.learner_id].push(s);
        }

      const result = [];
      // For each student
      for(const studentId in objLearnerSubmission){
        const row = {id:Number(studentId)};
        let totalScoreEarned = 0;
        let totalScorePossible =0;
        
        // check the assigment and retrive the ID
        for(const assignment of assignmentAlreadyDue){
            var studentSubmission = objLearnerSubmission[studentId].find(subID => subID.assignment_id === assignment.id);
            let earned = 0;
            // check if studentSubmission exsit and to check if the score is not undefined nor null 
            if(studentSubmission != null && studentSubmission.submission != null && studentSubmission.submission.score != null){
              earned = Number(studentSubmission.submission.score);
            }
             // for eached assigment graded can 
          let ratio = 0;
        if (assignment.pointsPossible > 0) {
          ratio = Math.round((earned / assignment.pointsPossible) * 1000) / 1000;
        }
        row[assignment.id] = ratio;
        totalScoreEarned = totalScoreEarned + earned;
        totalScorePossible = totalScorePossible + assignment.pointsPossible;
      }
      if(totalScorePossible > 0){
       row.averageGrade  = Math.round((totalScoreEarned / totalScorePossible) * 1000) / 1000;
      }else{
        row.averageGrade = 0;
      }
      result.push(row);

  }
  return result;
} 
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);