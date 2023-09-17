export default function labelTooltip(value, labelTooltip) {
    if(sliderData.length > 0){
        switch(value){
            case 0: 
                return labelTooltip == true ? sliderData[0].label : sliderData[0].tooltip
            case 20:
                return labelTooltip == true ? sliderData[1].label : sliderData[1].tooltip
            case 40:
                return labelTooltip == true ? sliderData[2].label : sliderData[2].tooltip
            case 60: 
                return labelTooltip == true ? sliderData[3].label : sliderData[3].tooltip
            case 80: 
                return labelTooltip == true ? sliderData[4].label : sliderData[4].tooltip    
            case 100:
                return labelTooltip == true ? sliderData[5].label : sliderData[5].tooltip 
            default:
                return "";   
        }
    } else {
        return "";
    }
}