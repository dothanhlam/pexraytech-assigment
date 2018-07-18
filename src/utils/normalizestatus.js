export default function* normalizeStatus(rawstatus) {

  return JSON.parse(rawstatus.data)
  
}