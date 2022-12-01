import React from "react";
import {useState,useEffect} from "react";
import Form from "react-bootstrap/Form";
import { useEditLetterMutation } from "./store/lettersApi";

const EditLetter = () => {

    const [letter_id, setLetter_id]=useState([]);
    const [content, setContent]=useState('')

    const [updateLetter, result]=useEditLetterMutation()

    const urlLetter=`http://localhost:8090/api/letters/{letters_id}?letter_id=${letter_id}&content=${content}`;


    async function fetchLetterId() {

        const response= await fetch(`http://localhost:8090/api/letters/{letters_id}?letter_id=${letter_id}&content=${content}`);

        if(response.ok) {

            const data = await response.json();
            console.log(data.id)
            // console.log("LETTER DATA", data);
            for(let i=0; i<data.length; i++) {

                if(i===data.length-1) {

                    const lastId = data[i].id;
                    // console.log("LAST", lastId);
                    console.log(lastId)
                    setLetter_id(lastId);
                }
            }
        }
    }



        // to get the id of the most recent letter created:
        useEffect(() => {
            fetchLetterId();
        },[]);

            console.log("RESPONSE",content,letter_id);

            async function handleUpdate(e) {
                e.preventDefault();
                updateLetter({content});
  }

        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Letter</th>
                            <th scope="col">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{letter_id.topic}</td>
                        <td>{letter_id.content}</td>

                    </tbody>
                </table>
            </div>
        );
    }





export default EditLetter;
