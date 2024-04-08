import { create } from "zustand";

const useStore = create((set) => ({
    bankNum: null,
    imageUrl: null,
    gender: null,
    isActive: false,
    emotion: null,
    modalOpen: false,
    modalName: '',
    donateOrSave: false,
    onlySave: false,
    middleOpen: false,
    request: {},
    emotionList: {},
    isDelete: false,

    setIsDelete : (state) => set(()=>({isDelete: state})),
    setEmotionList: (state) => set(()=>({emotionList: state})),
    setRequest: (state) => set(()=>({request: state})),
    setMiddleOpen: (state) => set(()=>({middleOpen: state})),
    setDonateOrSave: (state) => set(()=>({donateOrSave: state})),
    setOnlySave: (state) => set(()=>({onlySave: state})),
    setModalName: (name) => set(()=>({modalName: name})),
    handleModal: (state) => set(()=>({modalOpen: state})),
    setEmotion: (state) => set(() => ({emotion: state})),
    handleActive: (state) => set({isActive: state}),
    handleBankChange: (bankNum) => set(() => ({bankNum: bankNum})),
    handlePicChange: (imageUrl) => set(() => ({imageUrl:imageUrl})),
    handleGenderChange:(gender) => set(() => ({gender:gender})),
}));



export default useStore;