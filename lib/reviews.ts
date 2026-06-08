export interface Review {
  id: number
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  body: string
  helpful: number
  verified: boolean
}

export const REVIEWS: Record<number, Review[]> = {
  1: [
    { id: 1, author: 'Lucas M.', avatar: 'LM', rating: 5, date: '12 mai 2025', title: 'Melhor tênis que já tive!', body: 'Comprei para corrida urbana e superou todas as expectativas. O amortecimento é incrível, consigo correr 10km sem sentir dor alguma. A qualidade do material é excelente e já lavei várias vezes sem perder a forma.', helpful: 47, verified: true },
    { id: 2, author: 'Fernanda K.', avatar: 'FK', rating: 4, date: '3 abr 2025', title: 'Ótimo custo-benefício', body: 'Produto chegou antes do prazo, embalagem impecável. O tênis é muito confortável para o dia a dia. Tirei uma estrela apenas porque o cadarço poderia ser de melhor qualidade, soltou após duas semanas de uso.', helpful: 23, verified: true },
    { id: 3, author: 'Rafael S.', avatar: 'RS', rating: 5, date: '28 mar 2025', title: 'Vale cada centavo', body: 'Estava na dúvida entre esse e outro mais caro. Escolhi esse e não me arrependi. Leve, estiloso e muito resistente. Já usei em trilha e funcionou perfeitamente.', helpful: 31, verified: false },
    { id: 4, author: 'Mariana T.', avatar: 'MT', rating: 3, date: '15 fev 2025', title: 'Bom mas veio pequeno', body: 'O produto em si é de qualidade, mas veio um número menor do que o pedido. O processo de troca foi tranquilo mas demorou 15 dias. Após a troca fiquei satisfeita com o produto.', helpful: 12, verified: true },
  ],
  2: [
    { id: 1, author: 'Ana C.', avatar: 'AC', rating: 5, date: '8 mai 2025', title: 'Perfeita para o dia a dia', body: 'Uso essa mochila todos os dias para ir ao trabalho. Cabe meu notebook de 15", documentos, garrafinha e ainda sobra espaço. Os alças são super confortáveis mesmo com carga pesada.', helpful: 58, verified: true },
    { id: 2, author: 'Pedro H.', avatar: 'PH', rating: 4, date: '22 abr 2025', title: 'Muito boa, mas falta um bolso', body: 'Material excelente, zíperes de qualidade. Só acho que falta um bolso lateral para garrafinha. Tive que adaptar, mas no geral é uma mochila muito boa pelo preço.', helpful: 19, verified: true },
    { id: 3, author: 'Camila R.', avatar: 'CR', rating: 5, date: '10 mar 2025', title: 'Comprei e indiquei para 3 amigas', body: 'Simplesmente perfeita. Design moderno, espaço interno inteligente, e a parte de trás ventilada faz muita diferença no verão. As amigas que indiquei também adoraram.', helpful: 44, verified: true },
  ],
  3: [
    { id: 1, author: 'Bruno L.', avatar: 'BL', rating: 5, date: '15 mai 2025', title: 'O cancelamento de ruído é impressionante', body: 'Trabalho em home office e esse fone mudou minha vida. O cancelamento de ruído bloqueia completamente o barulho da rua e dos filhos em casa. Som de altíssima qualidade para música e calls.', helpful: 89, verified: true },
    { id: 2, author: 'Júlia F.', avatar: 'JF', rating: 4, date: '1 mai 2025', title: 'Excelente, app poderia ser melhor', body: 'O fone em si é perfeito, som cristalino e confortável para usar horas. Porém o aplicativo de configuração é confuso e travou algumas vezes. A bateria de 40h é real, testei e comprova.', helpful: 35, verified: true },
    { id: 3, author: 'Diego M.', avatar: 'DM', rating: 5, date: '20 abr 2025', title: 'Compra sem medo', body: 'Troquei um fone de marca famosa por esse e não sinto falta. Pelo preço, é imbatível. Pareamento rápido, não cai durante exercícios e o estojo de carregamento é compacto.', helpful: 27, verified: false },
    { id: 4, author: 'Tatiane B.', avatar: 'TB', rating: 3, date: '5 abr 2025', title: 'Bom mas esquenta a orelha', body: 'Qualidade de som ótima sem dúvida. Porém para quem usa por mais de 2 horas seguidas, as orelhas esquentam bastante. Ideal para uso de até 1h30. Para trabalho longo prefiro fone in-ear.', helpful: 41, verified: true },
  ],
  4: [
    { id: 1, author: 'Rodrigo A.', avatar: 'RA', rating: 5, date: '18 mai 2025', title: 'Melhor smartwatch do mercado nessa faixa', body: 'Monitor cardíaco preciso, comparei com aparelho médico e a diferença foi mínima. O GPS é rápido para conectar e a tela AMOLED é belíssima mesmo no sol. Uso há 3 meses e bateria segura 6 dias.', helpful: 112, verified: true },
    { id: 2, author: 'Isabela N.', avatar: 'IN', rating: 5, date: '2 mai 2025', title: 'Companheiro perfeito para treinos', body: 'Uso para corrida, natação e academia. Resistência à água impecável, as métricas de treino são detalhadas e o app integra bem com outros apps de saúde. Design elegante, uso no trabalho também sem parecer estranho.', helpful: 67, verified: true },
    { id: 3, author: 'Carlos E.', avatar: 'CE', rating: 4, date: '14 abr 2025', title: 'Muito bom, pulseira poderia ser melhor', body: 'Funcionalidades excelentes, sem reclamação. Só acho que a pulseira padrão poderia ser de silicone mais macio. Comprei uma de couro separada e ficou muito melhor. Fora isso, produto 10.', helpful: 29, verified: true },
  ],
  5: [
    { id: 1, author: 'Marcela V.', avatar: 'MV', rating: 5, date: '5 mai 2025', title: 'Impermeável de verdade!', body: 'Testei na chuva forte durante trilha e não entrou uma gota. Leve, não abafa e o design é moderno. Ótima compra para quem pratica atividades ao ar livre.', helpful: 38, verified: true },
    { id: 2, author: 'Henrique P.', avatar: 'HP', rating: 4, date: '18 abr 2025', title: 'Boa jaqueta, zíper delicado', body: 'Material de qualidade e realmente impermeável. Cuidado com o zíper principal, é um pouco delicado. Fora isso, excelente produto pelo preço.', helpful: 15, verified: true },
    { id: 3, author: 'Priscila O.', avatar: 'PO', rating: 5, date: '22 mar 2025', title: 'Uso diário há 6 meses', body: 'Comprei em setembro do ano passado e uso praticamente todo dia no inverno. Mantém o calor, não pesa, lava fácil. Produto muito durável.', helpful: 52, verified: true },
  ],
  6: [
    { id: 1, author: 'Beatriz C.', avatar: 'BC', rating: 4, date: '10 mai 2025', title: 'Divertida e fácil de usar', body: 'Presente para minha filha de 12 anos e ela amou. As fotos ficam com qualidade boa para o estilo instantâneo. Os filtros do app são criativos. Única ressalva é o custo do filme de recarga.', helpful: 44, verified: true },
    { id: 2, author: 'Thiago R.', avatar: 'TR', rating: 5, date: '25 abr 2025', title: 'Perfeita para eventos', body: 'Levei numa festa de aniversário e foi o maior sucesso. Todo mundo queria tirar foto. As imagens revelam rápido e a qualidade é boa. Recomendo muito para eventos sociais.', helpful: 33, verified: false },
    { id: 3, author: 'Leticia M.', avatar: 'LM', rating: 3, date: '8 abr 2025', title: 'Legal mas filme é caro', body: 'A câmera em si é charmosa e funciona bem. Mas o custo-benefício fica comprometido pelo preço do filme: cada pacote de 10 fotos custa R$40. Para uso frequente fica inviável financeiramente.', helpful: 61, verified: true },
  ],
  7: [
    { id: 1, author: 'André F.', avatar: 'AF', rating: 5, date: '14 mai 2025', title: 'Placa de carbono faz diferença!', body: 'Corredor amador aqui. A placa de carbono realmente melhora a eficiência da passada. Melhorei meu tempo de 10km em 3 minutos depois de adaptar ao tênis. Amortecimento excelente para longas distâncias.', helpful: 78, verified: true },
    { id: 2, author: 'Simone K.', avatar: 'SK', rating: 4, date: '30 abr 2025', title: 'Ótimo para treinos longos', body: 'Uso para meia-maratona e maratona. Confortável do início ao fim da prova. Só acho que o cabedal poderia ser mais respirável no calor intenso. No geral, excelente tênis de performance.', helpful: 45, verified: true },
    { id: 3, author: 'Gustavo L.', avatar: 'GL', rating: 5, date: '12 abr 2025', title: 'Compra dos sonhos', body: 'Economiei 4 meses para comprar e valeu cada centavo. Material premium, durabilidade incrível. Já rodei 800km sem desgaste visível. Produto profissional com preço justo.', helpful: 56, verified: true },
  ],
  8: [
    { id: 1, author: 'Natalia S.', avatar: 'NS', rating: 4, date: '9 mai 2025', title: 'Leve e estiloso', body: 'Armação de titânio realmente leve, mal sinto que estou usando. Proteção UV eficaz testada no oftalmo. Design moderno e neutro que combina com vários estilos.', helpful: 22, verified: true },
    { id: 2, author: 'Victor M.', avatar: 'VM', rating: 3, date: '20 abr 2025', title: 'Bom mas estojo deixa a desejar', body: 'As lentes são de qualidade e a proteção UV funciona. Porém o estojo que acompanha é de plástico fino e não protege bem. Investi num estojo melhor separado.', helpful: 17, verified: true },
    { id: 3, author: 'Aline B.', avatar: 'AB', rating: 5, date: '5 mar 2025', title: 'Comprei para minha mãe e adorou', body: 'Minha mãe tem problema de saúde ocular e precisava de proteção UV de qualidade. Esse modelo atende perfeitamente, é leve e ela usa todos os dias há 3 meses sem reclamação.', helpful: 34, verified: true },
  ],
  9: [
    { id: 1, author: 'Felipe A.', avatar: 'FA', rating: 5, date: '17 mai 2025', title: 'Perfeito para design e ilustração', body: 'Designer gráfico aqui. A tela de 120Hz com a caneta stylus é responsiva como nenhum tablet que já usei nessa faixa de preço. A latência da caneta é imperceptível. Substituiu meu papel completamente.', helpful: 93, verified: true },
    { id: 2, author: 'Renata C.', avatar: 'RC', rating: 4, date: '3 mai 2025', title: 'Excelente, carregamento poderia ser mais rápido', body: 'Produto incrível para trabalho criativo. A tela tem cores precisas e a caneta é muito confortável. Só o carregamento demora um pouco. Mas a bateria dura bem o dia todo com uso intenso.', helpful: 41, verified: true },
    { id: 3, author: 'Marco T.', avatar: 'MT', rating: 5, date: '28 abr 2025', title: 'Substituiu meu notebook para 80% das tarefas', body: 'Uso para reuniões, anotações, leitura de documentos e ilustração. Só não substitui 100% porque preciso de softwares específicos. Mas para a maioria das tarefas do dia a dia, é perfeito.', helpful: 67, verified: false },
    { id: 4, author: 'Vanessa L.', avatar: 'VL', rating: 4, date: '10 abr 2025', title: 'Vale muito o investimento', body: 'Paguei com parcelas e não me arrependo. Qualidade de construção premium, tela belíssima. Para estudantes é uma ótima opção. O armazenamento de 128GB seria melhor se fosse expansível.', helpful: 29, verified: true },
  ],
  10: [
    { id: 1, author: 'João P.', avatar: 'JP', rating: 5, date: '11 mai 2025', title: 'Streetwear autêntico de verdade', body: 'Exatamente o estilo retrô que procurava. A sola vulcanizada é resistente e o design é fiel aos anos 90. Recebi vários elogios na rua. Produto de qualidade que combina com qualquer roupa casual.', helpful: 48, verified: true },
    { id: 2, author: 'Bianca F.', avatar: 'BF', rating: 4, date: '26 abr 2025', title: 'Bonito mas pede meia espessa', body: 'O tênis é lindo e autêntico. Porém com meia fina fica um pouco folgado. Com meia esportiva normal fica perfeito. Comprei meio número acima do habitual e ficou ideal.', helpful: 23, verified: true },
    { id: 3, author: 'Daniel R.', avatar: 'DR', rating: 5, date: '15 mar 2025', title: 'Clássico que nunca sai de moda', body: 'Segundo par que compro da mesma linha. O primeiro durou 2 anos com uso quase diário. Qualidade consistente e design atemporal. Recomendo sem hesitar.', helpful: 61, verified: true },
  ],
  11: [
    { id: 1, author: 'Patricia M.', avatar: 'PM', rating: 4, date: '7 mai 2025', title: 'Custo-benefício ótimo', body: 'Kit de 6 pares por esse preço é excelente. Material respirável e antibacteriano de verdade, não sinto odor mesmo após treinos intensos. Durabilidade boa, 4 meses e ainda estão ótimas.', helpful: 37, verified: true },
    { id: 2, author: 'Roberto K.', avatar: 'RK', rating: 3, date: '19 abr 2025', title: 'Boa mas encolheu na lavagem', body: 'Qualidade do tecido é boa e o conforto também. Porém após lavar na máquina pela primeira vez, todas encolheram um pouco. Recomendo lavar à mão ou em programa delicado.', helpful: 28, verified: true },
  ],
  12: [
    { id: 1, author: 'Eduardo S.', avatar: 'ES', rating: 5, date: '16 mai 2025', title: 'Som 360° impressionante!', body: 'Levei para camping e foi o destaque do fim de semana. À prova d\'água de verdade, caiu no rio e funcionou perfeitamente. O som 360° é real, você pode andar ao redor que o som mantém a qualidade.', helpful: 84, verified: true },
    { id: 2, author: 'Claudia N.', avatar: 'CN', rating: 4, date: '30 abr 2025', title: 'Ótimo para praia e piscina', body: 'Uso toda semana na piscina. Resistência à água é excelente. Graves um pouco fracos para meu gosto, mas para ambiente externo e festas é perfeito. Bateria de 24h é real.', helpful: 41, verified: true },
    { id: 3, author: 'Mauricio F.', avatar: 'MF', rating: 5, date: '22 abr 2025', title: 'Melhor speaker portátil que já tive', body: 'Quarto speaker portátil que compro ao longo dos anos. Esse é disparado o melhor. Volume alto sem distorção, bateria duradoura e design robusto. Conecto dois no modo estéreo e fica incrível.', helpful: 59, verified: true },
    { id: 4, author: 'Alice T.', avatar: 'AT', rating: 3, date: '8 abr 2025', title: 'Bom mas emparelhamento instável', body: 'O som é muito bom e a resistência à água funciona. Porém o Bluetooth às vezes desconecta sem motivo, especialmente perto de outros dispositivos. Já atualizei o firmware e melhorou um pouco.', helpful: 33, verified: true },
  ],
}