<template>
    <div :class="{foc:MtvCore.CurrentPage && MtvCore.CurrentPage.id===pageId && MtvCore.CurrentZone && MtvCore.CurrentZone.id===zoneId && MtvCore.CurrentZone.index===index}">
        <slot></slot>
    </div>
</template>
<script>
    import MtvCore from '../libs/MtvCore'
    export default {
        name:'MtvFocClass',
        props:{
            index:{
                type:Number
            },
            pageId:String,
            zoneId:String
        },
        data(){
            return {
                MtvCore
            }
        }
    }
</script>
