const getBarHeight = (baseHeight: number, modifier: number = 1, meteringVoice: number) => {
    const normalizedVolume = Math.max(0, Math.min(100, (meteringVoice + 160) * (100 / 160))); 
    
    const dynamicHeight = Math.max(4, (normalizedVolume / 100) * baseHeight * modifier);
    return dynamicHeight;
};