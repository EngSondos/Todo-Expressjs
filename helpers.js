module.exports = {addToTodo,getDatass,updateToTodo,removeFromTodo,list,check}

let fs =require('fs')
let path = 'todo.json'
function getFileContent(path)
{
   //check file is exist
 existFile(path)
 //read file
return JSON.parse(fs.readFileSync(path,'utf-8'))
}

function writeFileData(fileData,cb)
{
  const x = fs.writeFileSync(path,JSON.stringify(fileData),cb)
  return true
}

function addToTodo(req,res){
 let readyData = {...req.body}
 fileData= getFileContent(path)
  // check if array is not empty
// console.log(req.body)
if(fileData.length)
 readyData['id']= parseInt(fileData[fileData.length-1].id)+1
else
   readyData['id']=1
readyData['check']=false
fileData[fileData.length]=readyData

// //write data
if(writeFileData(fileData)){
  res.json({"message":"Task Added Succsfully"})
}else{
  res.json({"message":"Some Thing Wrong"})

}
 
}
function updateToTodo(req,res)
{
  let {id}= req.params
  let readyData = req.body

  // readyData.id
  fileData=getFileContent(path)
  fileData.map((element)=>{
    if(element.id==id)
    {
      element.title = readyData.title || element.title
      element.body = readyData.body ||element.body
    }
  })
  // console.log(fileData)
  writeFileData(fileData)
  res.json({"message":"Task updated Succsfully"})

}


function removeFromTodo(req,res)
{
  let {id}= req.params

   // readyData.id
   fileData=getFileContent(path)
  fileData= fileData.filter(function(element){
    return element.id != id
   })
   writeFileData(fileData)
   res.json({"message":"Task deleted Succsfully"})


}

function list(req,res)
{
  let {type} = req.query

  let fileData = getFileContent(path);
  // console.log(fileData)
  let displayedData = fileData
  switch (type){
    case 'checked':
      displayedData =fileData.filter(function(element){
        return (element.check == true)

      })
      // console.log(rescheck)

      break;
    case 'unchecked':
      
    displayedData=fileData.filter(function(element){
      // console.log(element.check)
        return (element.check == false)
      })
      // console.log(res)
      
  }
  // console.log(displayedData)
  res.json(displayedData)
}

function check(req,res)
{
  let{id} = req.params
  fileData=getFileContent(path)
  fileData.map((element,index,array)=>{
    // console.log(element.id)
    if(element.id==id)
    {
      array[index].check= !element.check
    }
  })
  writeFileData(fileData)
  res.json({"message":"Task updated Succsfully"})

}




function existFile(path){
  if(!fs.existsSync(path))
  {
    fs.appendFileSync(path,JSON.stringify([]), function (err) {
        if (err) throw err;
        console.log('Saved!');
      })
  }
  return true;

}


function getDatass(params)
{

   let data= params.reduce(function(prev,element){
        [key,value]=element.split('=')
        prev[key]=value
        return prev
    },{})
    return data;
}