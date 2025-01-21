export interface IDomainService<T>
{
    handler: () => T
}

export class RandomCodeDomainService implements IDomainService<string>
{
  public handler(): string
  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const getRandomChar = () => characters.charAt(Math.floor(Math.random() * characters.length))
    
    const part1 = Array.from({ length: 3 }, getRandomChar).join('')
    const part2 = Array.from({ length: 3 }, getRandomChar).join('')
    
    return `${part1}${part2}`
  }
}
