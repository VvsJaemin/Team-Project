import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {Link, useHistory} from 'react-router-dom';
import { getReviewModify, currentReview } from '../reducer/review.reducer';

const ReviewModify = () => {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [files, setFiles] = useState([])
    const [fileSelect, setFileSelect] = useState(false)

    const reviewObj = useSelector(currentReview)

    const dispatch = useDispatch()
    const history = useHistory()

    const reviewFile = reviewObj.reviewFileDtoList

    console.log(reviewFile)

    useEffect(() => {
        setTitle(reviewObj.title)
        setContent(reviewObj.content)
        setFiles(reviewFile)
        setFileSelect(false)
    },[reviewObj])

    const fileModify=async(e)=>{
        let modifyResult = window.confirm("리뷰를 수정하시겠습니까?")
        const obj = {
            reviewId: reviewObj.reviewId, 
             title: title, 
            content: content, 
            writerId: reviewObj.writerId}
        const formData = new FormData()

        console.log(files)
        if(fileSelect){
            for(let i=0; i<files.length; i++){
                formData.append("files["+i+"]", files[i])
            }
        }
        formData.append("fileSelect", fileSelect)
        formData.append("title", obj.title)
        formData.append("content", obj.content)
        formData.append("reviewId", obj.reviewId)
        formData.append("writerId", obj.writerId)
        
        if(modifyResult){
            await dispatch(getReviewModify(formData))
            alert("리뷰 수정 완료!")
            setFiles(null)
            history.push(`/reviews/review_read/${reviewObj.reviewId}`)
        }
      
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    const handleChangeFile=(e)=>{
        const fileObj = e.target
        console.dir(fileObj.files)
        setFiles(fileObj.files)
        setFileSelect(true)
    }
    

    return (
        <section className="white-bg">
        <div className="container" style={{marginTop:"-100px"}}>
        <div id="respond" className="comment-respond">
        <h1 className="section-title text-center" >Review Modify</h1>

        <div className="row-form row" >
            <div className="col-form col-md-2" style={{marginBottom:"-60px"}}>
            <label> * writerName </label>
            <textarea style={{color:"black"}} value={reviewObj.writerName} name="writerName" readOnly></textarea> 
            </div>
        </div>
        </div>
        
        <div className="row-form row">
            <div className="col-form col-md-5">
            <label> * Title </label>
            <textarea name="title" style={{color:"black" ,marginBottom:"30px"}} className="md-textarea" id="title" rows="2"
                  placeholder="제목을 수정하세요"
                  value={title}
                  onChange={(e) => handleChangeTitle(e)}
                ></textarea>
            </div>
        </div>

        <div className="row-form row">
            <div className="col-form col-md-7">
            <label> * Content </label>
            <textarea
                  name="content"
                  style={{color:"black", marginBottom:"30px"}}
                  rows="5"
                  placeholder="내용을 수정하세요 *"
                  value={content}
                  onChange={(e) => handleChangeContent(e)}
                ></textarea>
            </div>
        </div>

        <div className="row-form row">
            <div className="col-form col-md-7">
            <input
                   style={{color:"black"}}
                  type="file"
                  name="file"
                  rows="1"
                  multiple={true}
                  onChange={(e) =>handleChangeFile(e)}
                ></input>
            </div>
        </div>
        
        <div style={{marginTop:"50px"}}>
            
        <button className="btn btn-success btn-md btn-default remove-margin pull-right" onClick={fileModify} >Modify</button>
        < Link to = {`/reviews/review_read/${reviewObj.reviewId}`} > 
        <button className="btn btn-color btn-md btn-default remove-margin" >Cancel</button> </Link>
        </div>

        <div className="display-flex" style={{marginTop:"50px"}}>
                            <>
                        { reviewFile && reviewFile[0] ? reviewFile?.map((file,i)=>{
                                return(
                                    <div key={file.uuid}> <img src={"http://localhost:8080/review_files/display?imgName="+"s_"+file.uuid+file.imgName}/>
                                      </div>
                                )
                            }) :<></>}
                               </>
                        </div>  
        </div>  
            </section>
    )
}

export default ReviewModify