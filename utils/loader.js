import { readdirSync, readFileSync, statSync } from 'fs'

export const loadVerses = (path) => {
  const files = readdirSync(path).filter(file => file.endsWith('.json'))
  return files.map(file => 
    JSON.parse(readFileSync(`${path}/${file}`, 'utf-8'))
  )
}


export const loadPoem = (path) => {
  const entries = readdirSync(path)
  
  return entries.flatMap(entry => {
    const fullPath = `${path}/${entry}`
    const meta = JSON.parse(readFileSync(`${path}/meta.json`, 'utf-8'))
    
    if (statSync(fullPath).isDirectory()) {
      return loadPoem(fullPath)  // recursively go deeper
    }
    
    if (entry.endsWith('.json')) {
      return JSON.parse(readFileSync(fullPath, 'utf-8'))
    }
    
    return []  // skip non-json files
  })
}