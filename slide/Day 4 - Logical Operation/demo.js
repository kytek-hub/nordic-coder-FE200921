/* Cho 1 danh sách các học viên với bảng điểm tìm ra những học viên xếp loại 
giỏi , khá, kém và trung bình
Biết rằng Giỏi là hơn hoặc bằng 9.00 
          Khá là hơn hoặc bằng 7.00
          Trung bình là hơn hoặc bằng 5.00
          Kém là nhỏ hơn hoặc bằng 5.00
Điểm hợp lệ phải là nhỏ hơn hoặc bằng 10 (Nếu không hợp lệ thì list ra)
Nếu có điểm exercise hơn hoặc bằng 8 thì sẽ được + 1 điểm
Nếu thuộc diện nghèo thì được + 0.5 điểm
*/

// 1. Tính bonus point dựa theo điều kiện
// 2. + bonus point vào điểm hiện tại
// 3. Dùng điểm đó để so sánh trả về kết quả { type:'tên thứ hạng',name:'' }
// 4. Dùng filter để ra kết quả

// >=
// <=
// ===

// return số lượng và tên
// giỏi là bao nhiêu
// khá là bao nhiêu
// trung bình là bao nhiêu
// kém là bao nhiêu
// những điểm không hợp lệ

const listStudent = [
  { name: 'Mary', point: 9.224, exercise: 5, isPoor: false },
  { name: 'Aboli', point: 2.1, exercise: 4, isPoor: false },
  { name: 'Adele', point: 4.9, exercise: 8, isPoor: false },
  { name: 'Alana', point: 5, exercise: 2, isPoor: true },
  { name: 'Amary', point: 10, exercise: 2, isPoor: false },
  { name: 'Angel', point: 11, exercise: 4, isPoor: false },
  { name: 'Athena', point: 8.5, exercise: 9, isPoor: true },
  { name: 'Briona', point: 9, exercise: 5, isPoor: true },
  { name: 'Yan', point: 5, exercise: 9, isPoor: false },
  { name: 'Ryan', point: 9, exercise: 5, isPoor: true },
  { name: 'Blella', point: 1, exercise: 3, isPoor: false },
  { name: 'Catarina', point: 2, exercise: 10, isPoor: false },
  { name: 'Catherine', point: 8, exercise: 4, isPoor: true },
]

// Sử dụng for, map , forEach
// Sử dụng if else
// Sử dụng switch case
// Sử dụng ternary condition

// Sử dụng if else
const filterList = listStudent.map(item => {
  // Khai báo 1 biến mới không dùng trực tiếp item.point vì sẽ làm ảnh hưởng list cũ
  let bonusPoint = 0

  // Exercise hơn 8 thì + 1 điểm
  if (item.exercise >= 8) bonusPoint += 1
  // Nếu thuộc diện nghèo thì + 0.5 điểm
  if (item.isPoor) bonusPoint += 0.5
  // Tính ra totalPoint hiện tại
  const totalPoint = item.point + bonusPoint
  // Tạo 1 biến chung vì đây là những biến sẽ trả về chung
  let commonVariable = { type: 'chưa gán xếp loại', name: item.name, point: totalPoint }

  // Xét điều kiện điểm
  // Giỏi là hơn hoặc bằng 9.00
  // Khá là hơn hoặc bằng 7.00
  // Trung bình là hơn hoặc bằng 5.00
  // Kém là nhỏ hơn hoặc bằng 5.00
  // Điểm hợp lệ phải là nhỏ hơn hoặc bằng 10(Nếu không hợp lệ thì list ra)
  // Comment lại theo cách mình muốn thử để xem kết quả nhé ở đây thầy sẽ list ra 2 cách
  // Sử dụng if else
  if (totalPoint > 10) {
    commonVariable.type = 'invalid'
  } else if (totalPoint >= 9) {
    commonVariable.type = 'A+'
  } else if (totalPoint >= 7) {
    commonVariable.type = 'A'
  } else if (totalPoint >= 5) {
    commonVariable.type = 'B'
  } else if (totalPoint >= 0) {
    commonVariable.type = 'C'
  }
  // Sử dụng ternary condition
  // Trong đây không thể dùng để return giá trị nên chỉ dùng để gán dữ liệu mới dựa theo điều kiện
  commonVariable.type = totalPoint > 10 ? 'invalid' : 
  (totalPoint >= 9 ? 'A+' : 
  (totalPoint >= 7 ? 'A' : 
  (totalPoint >= 5 ? 'B' : 'C')
  ))
  // Kết quả trả về sẽ bao gồm Type name và point
  return commonVariable
})

// Sử dụng filter để lọc ra kết quả cuối cùng
const filterAPlus = filterList.filter(item => item.type === 'A+')
const filterA = filterList.filter(item => item.type === 'A')
const filterB = filterList.filter(item => item.type === 'B')
const filterC = filterList.filter(item => item.type === 'C')
// In kết quả
// Điểm A+
console.log('Số lượng học sinh điểm A+: ' + filterAPlus.length + ', Có họ tên điểm là:' + filterAPlus.map(item => ' Tên: ' + item.name + ' Điểm: ' + item.point))
// Cách in kết quả bằng sử dụng ``
// Điểm A
console.log(`Số lượng học sinh điểm A: ${filterA.length}
Có họ tên điểm là: 
${filterA.map(item => `Name: ${item.name}, Point: ${item.point} `)}`)
// Điểm B
console.log(`Số lượng học sinh điểm B: ${filterB.length}
Có họ tên điểm là: 
${filterB.map(item => `Name: ${item.name}, Point: ${item.point} `)}`)
// Điểm C
console.log(`Số lượng học sinh điểm C: ${filterC.length}
Có họ tên điểm là: 
${filterC.map(item => `Name: ${item.name}, Point: ${item.point} `)}`)
