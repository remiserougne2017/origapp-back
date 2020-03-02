var express = require('express');
var router = express.Router();
var booksModel = require('../model/books')

/*  Creation BDD */
router.get('/bdd', async function(req, res, next) {

  var jddBooks=[
    {
        isbn: "978-2-266-17442-8",
        image: "https://products-images.di-static.com/image/henry-chancellor-les-extraordinaires-aventures-de-tom-scatterhorn-tome-1-le-musee-abandonne/9782266174428-475x500-1.webp",
        title: "extraordinaires aventures de Tom Scatterhorn (Les)",
        authors: "Chancellor",
        illustrators: "Henry",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 4,
        votesCount: 50,
        content: [
        {
          title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
          pageNum: 3,
          status: true,
          media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
        },
        {
          title: 'Titre du contenu 2 de la page 3',
          pageNum: 3,
          status: true,
          media: [
            {
              title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
          ]
      },
      {
          title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
          pageNum: 3,
          status: true,
          media: [
          {
            title:'Découvrez le patrimoine de Rosa Bonheur',
            type:'text',
            texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
            position:2
          },
          {
            title:'Une photo de Rosa Bonheur',
            type:'image',
            source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
            position:3
          },

        ]
      },
      {
          title: 'Titre du contenu 1 de la page 5',
          pageNum: 5,
          status: true,
          media: [
          {
            title:'En voyage avec Rosa Bonheur',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
          {
            title:'Découvrez le patrimoine de Rosa Bonheur',
            type:'text',
            texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
            position:2
          },
          {
            title:'Une photo de Rosa Bonheur',
            type:'image',
            source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
            position:3
          },
        ]
    },
      {
          title: 'Titre du contenu 2 de la page 8',
          pageNum: 8,
          status: true,
          media: [
        {
          title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
          type:'video',
          source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
          duration:9,
          texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
          position:1
        },
      ]
  },
  {
          title: 'Titre du contenu de la page 10',
          pageNum: 10,
          status: true,
          media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },

          ]
  },
  {
          title: 'Titre du contenu 1 de la page 10',
          pageNum: 10,
          status: true,
          media: [
          {
            title:'En voyage avec Rosa Bonheur',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
          {
            title:'Découvrez le patrimoine de Rosa Bonheur',
            type:'text',
            texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
            position:2
          },
    ]
    },
    {
          title: 'Titre du contenu 1 de la page 20',
          pageNum: 20,
          status: true,
          media: [
          {
            title:'Une photo de Rosa Bonheur',
            type:'image',
            source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
            position:3
          },
]
},
          {
          title: 'Titre du contenu 1 de la page 20',
          pageNum: 21,
          status: true,
          media: [
          {
            title:'Un enrefistrement de la restauratrice de patrimone',
            type:'audio',
            source: 'https://soundcloud.com/roddyricch/the-box',
            position:3
          },
          ]
          }
  ]

    },
    {
        isbn: "2-03-652407-9",
        image: "https://pictures.abebooks.com/CHAPITRE/30288061748.jpg",
        title: "L'histoire du monde",
        year_publishing: 1996,
        type: "Livre",

        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]    },
    {
        isbn: "978-2-8098-0563-5",
        image: "https://pictures.abebooks.com/isbn/9782809805635-fr.jpg",
        title: "L'eau des anges",
        authors: "Egémar",
        illustrators: "Béatrice",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-36231-035-5",
        image: "https://pictures.abebooks.com/RECYCLIVRE/30505372741.jpg",
        title: "Quand on parle du loup",
        authors: "Harrison",
        illustrators: "Lisi",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-226-20937-5",
        image: "https://pictures.abebooks.com/RECYCLIVRE/30514318084.jpg",
        title: "étang aux libellules (L')",
        authors: "Ibbotson",
        illustrators: "Eva",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-8098-0564-2",
        image: "https://pictures.abebooks.com/isbn/9782809805642-fr.jpg",
        title: "Avant les ténèbres",
        authors: "Cluzeau",
        illustrators: "Nicolas",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "2-84789-206-0",
        image: "https://pictures.abebooks.com/RECYCLIVRE/30565299601.jpg",
        title: "Contes et récits vietnamiens",
        authors: "Minh Than",
        year_publishing: "2004",
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-01-201748-1",
        image: "https://pictures.abebooks.com/RECYCLIVRE/30569110610.jpg",
        title: "La boussole du Club des cinq",
        authors: "Blyton",
        illustrators: "Enid",
        year_publishing: "DL 2009",
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-7470-2469-3",
        image: "https://pictures.abebooks.com/isbn/9782747024693-fr.jpg",
        title: "Momo",
        authors: "Ende",
        illustrators: "Michael",
        year_publishing: 2009,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-35504-169-3",
        image: "https://pictures.abebooks.com/AMMAREAL2013/30303239658.jpg",
        title: "Je m'appelle pas Ben Laden !",
        authors: "Chambaz",
        illustrators: "Bernard",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    },
    {
        isbn: "978-2-211-20802-4",
        image: "https://pictures.abebooks.com/RECYCLIVRE/30574082639.jpg",
        title: "Ogres, brigands et compagnie",
        authors: "Ungerer",
        illustrators: "Tomi",
        year_publishing: 2011,
        type: "Livre",
        published: true,
        rating: 3,
        votesCount: 50,
        content: [
          {
            title: 'Titre du contenu 1 de la page 3. Titre du contenu 1 de la page 3Titre du contenu 1 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'En voyage avec Rosa Bonheur',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
              {
                title:'Une photo de Rosa Bonheur',
                type:'image',
                source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
                position:3
              },
            ]
          },
          {
            title: 'Titre du contenu 2 de la page 3',
            pageNum: 3,
            status: true,
            media: [
              {
                title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
                type:'video',
                source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
                duration:9,
                texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
                position:1
              },
            ]
        },
        {
            title: 'Titre du contenu 3 de la page 3. Et une peu de text e nplus ',
            pageNum: 3,
            status: true,
            media: [
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  
          ]
        },
        {
            title: 'Titre du contenu 1 de la page 5',
            pageNum: 5,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
          ]
      },
        {
            title: 'Titre du contenu 2 de la page 8',
            pageNum: 8,
            status: true,
            media: [
          {
            title:'Voici le titre de la vidéo 2 qui présente une deuxieme vidéo pour le contenu',
            type:'video',
            source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
            duration:9,
            texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
            position:1
          },
        ]
    },
    {
            title: 'Titre du contenu de la page 10',
            pageNum: 10,
            status: true,
            media: [
              {
                title:'Découvrez le patrimoine de Rosa Bonheur',
                type:'text',
                texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                position:2
              },
  
            ]
    },
    {
            title: 'Titre du contenu 1 de la page 10',
            pageNum: 10,
            status: true,
            media: [
            {
              title:'En voyage avec Rosa Bonheur',
              type:'video',
              source:"https://www.youtube.com/watch?v=LLX1Bp5MjvY",
              duration:9,
              texte:'En collaboration avec le magazine "Antiquités brocante" je vous emmène en villégiature à Thomery dans le chateau extraordinaire de Rosa Bonheur. ',
              position:1
            },
            {
              title:'Découvrez le patrimoine de Rosa Bonheur',
              type:'text',
              texte:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
              position:2
            },
      ]
      },
      {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 20,
            status: true,
            media: [
            {
              title:'Une photo de Rosa Bonheur',
              type:'image',
              source: 'meisterdrucke.fr/kunstwerke/500px/Rosa%20Bonheur%20-%20Shepherd%20in%20the%20Pyrenees%20%20-%20(MeisterDrucke-570949).jpg',
              position:3
            },
  ]
  },
            {
            title: 'Titre du contenu 1 de la page 20',
            pageNum: 21,
            status: true,
            media: [
            {
              title:'Un enrefistrement de la restauratrice de patrimone',
              type:'audio',
              source: 'https://soundcloud.com/roddyricch/the-box',
              position:3
            },
            ]
            }
    ]
    }
]
// Mise en place de la BDD
//jddBooks est un tableau d'obd de livres cf. le fichier dans le public/javascripts/jdd
 var save = jddBooks.map(async e => {
        var newBooks = new booksModel (e);
        var booksSave = await newBooks.save();
        return booksSave
    })

  res.render('index', { title: 'Express' });
});


router.post('/open-book', async function(req,res,next){
  console.log('booooooook');
  res.json({result:true})

});



module.exports = router;
