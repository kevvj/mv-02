'use client'
import supabase from "@/app/hooks/supabase"
import { Excel, Pdf, Word } from "./DownloadItems"
import ImgItem from "./ImgViewer"
import { useEffect, useState } from "react"
import { getFilesTable } from "@/app/upload/hooks/GetFileTable"

export const Load = ({ name, user_id }) => {

    const [dataPrueb, setDataPrueba] = useState(null)

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const { data: data1, error: error1 } = await supabase
            .from('pendingfiles')
            .select('*')
            .eq('name', name)

        if (error1) {
            console.log(error1)
            return
        }

        if (data1.length !== 0) {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`${data1[0]?.user_id}/${name}`)

            setDataPrueba(data)
        }

        const { data: data2, error: error2 } = await supabase
            .from('files')
            .select('*')
            .eq('name', name)

        if (error2) {
            console.log(error2)
            return
        }

        if (data2.length !== 0) {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`${data2[0]?.user_id}/${name}`)

            setDataPrueba(data)

        }

        if (user_id) {
            const { data: data3, error: error3 } = await supabase
                .storage
                .from('files')
                .list(`${user_id}`)

            if (error3) {
                console.log(error3)
                return
            }

            const personal = data3.find(file => file.name === name)

            if (personal) {
                const { data, error } = supabase.storage
                    .from('files')
                    .getPublicUrl(`${user_id}/${name}`)

                if (error) {
                    console.log(error)
                    return
                }
                setDataPrueba(data)
                console.log(data)
            }
        }


    }

    return (
        dataPrueb && <div>
            {dataPrueb.publicUrl.endsWith('.pdf') && <Pdf href={dataPrueb.publicUrl} name={name}></Pdf>}
            {dataPrueb.publicUrl.endsWith('.docx') && <Word href={dataPrueb.publicUrl} name={name}></Word>}
            {/\.(csv|xlsx|xls)$/i.test(dataPrueb.publicUrl) && <Excel href={dataPrueb.publicUrl} name={name}></Excel>}
            {dataPrueb.publicUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && <ImgItem src={dataPrueb.publicUrl}></ImgItem>}
        </div>
    )
}



