
export const clamp = (min,max,value) => value<min?min : value>max? max : value

export const groupBy = (key='',array=[])=>array.reduce((acc,cur,inx)=>{
    const group = cur[key]
    if(!group) return acc;
    if(!acc[group]) acc[group] = []
    acc[group].push(cur)
    return acc;
},{})

export const ungroup = (object={})=>Object.entries(object).reduce((acc,[key,value])=>{
    if(Array.isArray(value))
        value.map(val=>acc.push(val))
    else 
        acc.push(value)
    return acc;
},[])

export const isNum = val => /^\d+$/.test(val);

export const seperateBySpace = str=>str?.split?.(/\s+/)


export function matchFuzzy(thi, s/*search term*/) {
    if(typeof(thi)!=='string' || typeof(s)!=='string' ) return false;
    let hay = thi.toLowerCase(),i = 0,n = -1,l;
    s = s.toLowerCase();
    for (; (l = s[i++]); ) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true;
};