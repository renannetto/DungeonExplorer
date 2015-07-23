# DungeonExplorer (procura-se sugestão de nomes)

A ideia é um jogo de exploração de dungeons 2D feito usando a engine Phaser para Javascript.

Features:
 - Singleplayer (veja seção "Como ganhar dinheiro com isso")
 - Visão top down
 - Mapa em tiles, podendo fazer protótipos no Tiled
 - Mapas gerados proceduralmente, de forma que tenha potencialmente um número infinito de dungeons, e o jogador continua até o personagem morrer
 - Cada dungeon tem um boss, que quando morto permite que o jogador avance para a próxima dungeon
 - O jogador pode escolher entre um número de tipos de personagem para jogar (ex: mago, arqueiro, ladrão, ...)
 - Os ataques do jogador seriam sempre à distância, para que não tenha problemas com colisões, tipo ter que chegar muito perto do inimigo pra acertar, ou acertar de muito longe
 - O jogador leva dano automaticamente ao tocar em um inimigo
 - Enquanto o jogador avança ele vai coletando itens que melhoram o personagem e, possivelmente, dão habilidades novas

Como ganhar dinheiro com isso:
 - A ideia é fazer uma versão singleplayer free inicialmente e, se der certo, publicar na google play, por exemplo. Se tiver uma quantidade razoável de downloads, poderíamos fazer uma versão multiplayer que seria paga, e permitiria jogar coop ou pvp (ao estilo dark souls, em que um jogador pode invadir o jogo de outro pra tentar matar ele).

O que já tem no código:
 - AssetLoader: carrega os assets (ex: imagens, audios, ...) do jogo.
 - Prefab: um prefab é um objeto do jogo (ex: player, enemy, chest, ...). A ideia é que a classe prefab tenha apenas informações necessárias para que ele exista no jogo, como informações de colisão e do corpo físico. As funcionalidades seriam implementadas nos scripts (veja a seguir).
 - PrefabFactory: fábrica que recebe um objeto descrevendo o prefab (lido de um arquivo json) e instancia o prefab. A factory deve ser implementada para cada jogo com os prefabs dele.
 - Script: representa uma funcionalidade de algum prefab (ex: PlayerMovement, PlayerAttack, EnemyMovement, ...). O arquivo que descreve os prefabs também precisa descrever os scripts dele.
 - ScriptFactory: fábrica de scripts, funciona do mesmo jeito que a fábrica de prefabs.
 - BootState: carrega um arquivo json com as informações do level (assets e prefabs)
 - LoadingState: carrega os assets do jogo (a ideia é colocar uma tela de loading também)
 GameState: instancia os prefabs para aquele level. Essa classe deve ser implementada para cada jogo com coisas específicas dele.

Possível próximo passo:
 - Integrar com o Tiled para que possamos fazer protótipos usando ele de forma que o código do jogo só precise ler o arquivo salvo pelo Tiled, e instancie os objetos.
