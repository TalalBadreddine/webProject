
let dictForWeekDays = {"sunday":"0", "monday":"1", "tuesday":"2", "wednesday":"3", "thursday":"4", "friday":"5", "saturday":"6"}

$(document).ready(function(){
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    // initialView: 'listWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true, // allow "more" link when too many events
    droppable:true,
    events:[
    ]
      
  });

  calendar.render();

  $.ajax({
    url:'../php/loadAllCoursesTiming.php',
    type:'POST',
    success:function(response){
      let data = JSON.parse(response)
      console.log(data)
      for(let i = 0 ; i < data.length ; i++){
        let arr = data[i]
        let weeklyTiming = arr[11].split('-')

        for(let i = 0 ; i < weeklyTiming.length ; i++){
          let dailyTiming = weeklyTiming[i].split(':')
          let day = dictForWeekDays[dailyTiming[0].toLowerCase()]
          let startTime = dailyTiming[1].split('/')[0]
          let endTime = dailyTiming[1].split('/')[1]

          console.log(arr[1],[day],startTime,endTime)

          calendar.addEvent({
          title: arr[1],
          daysOfWeek: [ day ], // these recurrent events move separately
          startTime: `${startTime}:00:00`,
          endTime: `${endTime}:30:00`,
          endRecur: "2022-07-25"
          })
        }
      }
}})
})

// function turnIntoEvent(arr){
//   let weeklyTiming = arr[11].split('-')

//   for(let i = 0 ; i < weeklyTiming.length ; i++){
//     let dailyTiming = weeklyTiming[i].split(':')
//     let day = dictForWeekDays[dailyTiming[0].toLowerCase()]
//     let startTime = dailyTiming[1].split('/')[0]
//     let endTime = dailyTiming[1].split('/')[1]
    
//     let currentEvent = {
//       title: arr[1],
//       daysofWeek: [day],
//       startTime: startTime+":00:00",
//       endTime: endTime+":00:00",
//       endRecur: "2022-07-25"
//     }

//     return(currentEvent)
//   }
// }