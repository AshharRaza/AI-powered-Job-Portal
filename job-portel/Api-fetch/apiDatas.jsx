export const JobListbackend = async() =>  {
      try {
            const res = await fetch("http://localhost:3000/joblist",{
                method:'GET',
                credentials:'include'
            })
            const data = await res.json()
            if(!res.ok){
                
                alert(data.message)
                  window.location.href = "/login";
            }
            
            return data
        } catch (error) {
            console.log(error)
            
        }
    
}
export const SendingResumePath = async(file) => {

    try {
        console.log(file)
       const res =  await fetch('http://localhost:3000/sendresume',{
            method:'POST',
           
            body: file
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
    }
}

export const SendResumeDetail = async(detail) => {

    
    console.log(detail)
    try {
        const res = await fetch('http://localhost:3000/resumedetail',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(detail),
            credentials:"include"
        })
        console.log(res)

    } catch (error) {
        console.log(error)
    }
}



 