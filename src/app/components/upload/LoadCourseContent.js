'use client'
import supabase from "@/app/hooks/supabase"
import { Excel, Pdf, Word } from "./DownloadItems"
import ImgItem from "./ImgViewer"
import { useEffect, useState } from "react"
import { getFilesTable } from "@/app/upload/hooks/GetFileTable"

export const Load = ({ name }) => {

    const [dataPrueb, setDataPrueba] = useState(null)

    const { data, error } = supabase.storage
        .from('files')
        .getPublicUrl(`allfiles/${name}`)

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

        if (data1) {
            const {data, error} = supabase.storage
                .from('files')
                .getPublicUrl(`${data1[0]?.user_id}/${name}`)

                setDataPrueba(data)

            console.log(data)
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



