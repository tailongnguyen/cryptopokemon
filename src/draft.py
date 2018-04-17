out = open("script.txt", "w")
with open("crawled.txt", "r") as f:
    idx = 0
    for line in f.readlines():
        idx+=1
        splits = line.split(' ')
        for i, s in enumerate(splits):
            try:
                val = int(s)
                break
            except ValueError:
                continue 

        name = ' '.join(splits[:i])
        stats = splits[i:i+7]
        print(idx, stats)
        hp = int(stats[0])
        attack = (int(stats[1]) + int(stats[3]))//2
        defense = (int(stats[2]) + int(stats[4]))//2
        speed = int(stats[5])
        out.write('primitives.push(PrimitivePokemon("{}", {}, BaseStats({}, {}, {}, {})));\n'.format(name, int(hp+attack+defense+speed), attack, defense, speed, hp))
