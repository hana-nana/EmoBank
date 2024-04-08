import * as account from "@/services/account.js"


const CreateButton = async(data) => {
    const response = await account.accountCreate(data)
    return (
        <button type="submit" onClick={CreateButton} style={{transform:'translateY(-100px)'}}>
            저장
        </button>
       
    )

}

export default CreateButton