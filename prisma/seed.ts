// prisma/seed.ts

import { LikeAuthor, PrismaClient, State, StatusProject, StudyArea, WorkType} from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
//userIds 
//158 - 188 - 138 - 111 - 259 - 260 - 252 - 128 - 118 - 101
async function main() {
    // Exemplo Do Prisma
    // const post1 = await prisma.article.upsert({
    //   where: { title: 'Prisma Adds Support for MongoDB' },
    //   update: {},
    //   create: {
    //     title: 'Prisma Adds Support for MongoDB',
    //     body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
    //     description:
    //       "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    //     published: false,
    //   },
    // });
    const users = [
        {
            id: 158,
            name: 'Lucas Silva',
            password: '#SenhaLucas123',
            email: 'lucas_silva@gmail.com',
            username: 'lucassilva',
            birthDate: '1998-05-21T18:19:31.966Z',
            state: 'SP',
        },
        {
            id: 188,
            name: 'Maria Oliveira',
            password: '#Maria1234',
            email: 'maria_oliveira@gmail.com',
            username: 'mariaoliveira',
            birthDate: '1985-03-12T18:19:31.966Z',
            state: 'RJ',
        },
        {
            id: 138,
            name: 'João Santos',
            password: '#SenhaJoao123',
            email: 'joao_santos@gmail.com',
            username: 'joaosantos',
            birthDate: '1992-07-05T18:19:31.966Z',
            state: 'MG',
        },
        {
            id: 190,
            name: 'Ana Souza',
            password: '#Ana1234',
            email: 'ana_souza@gmail.com',
            username: 'anasouza',
            birthDate: '1990-11-15T18:19:31.966Z',
            state: 'BA',
        },
        {
            id: 244,
            name: 'Carlos Pereira',
            password: '#Carlos1234',
            email: 'carlos_pereira@gmail.com',
            username: 'carlospereira',
            birthDate: '1987-01-23T18:19:31.966Z',
            state: 'PE',
        },
        {
            id: 128,
            name: 'Fernanda Lima',
            password: '#Fernanda1234',
            email: 'fernanda_lima@gmail.com',
            username: 'fernandalima',
            birthDate: '1995-08-31T18:19:31.966Z',
            state: 'RS',
        },
        {
            id: 118,
            name: 'Roberto Silva',
            password: '#Roberto1234',
            email: 'roberto_silva@gmail.com',
            username: 'robertosilva',
            birthDate: '1999-12-20T18:19:31.966Z',
            state: 'PR',
        },
        {
            id: 111,
            name: 'Juliana Oliveira',
            password: '#Juliana1234',
            email: 'juliana_oliveira@gmail.com',
            username: 'julianaoliveira',
            birthDate: '1988-04-08T18:19:31.966Z',
            state: 'SC',
        },
        {
            id: 101,
            name: 'Rafael Souza',
            password: '#Rafael1234',
            email: 'rafael_souza@gmail.com',
            username: 'rafaelsouza',
            birthDate: '1991-09-14T18:19:31.966Z',
            state: 'GO',
        },
        {
            id: 260,
            name: 'Camila Lima',
            password: '#Camila1234',
            email: 'camila_lima@gmail.com',
            username: 'camilalima',
            birthDate: '1997-03-02T18:19:31.966Z',
            state: 'MT',
        },
        {
            id: 259,
            name: 'Fábio Pereira',
            password: '#Fabio1234',
            email: 'fabio_pereira@gmail.com',
            username: 'fabiopereira',
            birthDate: '1986-01-10T18:19:31.966Z',
            state: 'AL',
        },
        {
            id: 253,
            name: 'Beatriz Santos',
            password: '#Beatriz1234',
            email: 'beatriz_santos@gmail.com',
            username: 'beatrizsantos',
            birthDate: '1982-07-19T18:19:31.966Z',
            state: 'ES',
        },
        {
            id: 252,
            name: 'Thiago Oliveira',
            password: '#Thiago1234',
            email: 'thiago_oliveira@gmail.com',
            username: 'thiagooliveira',
            birthDate: '1993-05-27T18:19:31.966Z',
            state: 'AM',
        },
        {
            id: 251,
            name: 'Isabela Silva',
            password: '#Isabela1234',
            email: 'isabela_silva@gmail.com',
            username: 'isabelasilva',
            birthDate: '1996-11-30T18:19:31.966Z',
            state: 'CE',
        },
        {
            id: 250,
            name: 'Mateus Souza',
            password: '#Mateus1234',
            email: 'mateus_souza@gmail.com',
            username: 'mateussouza',
            birthDate: '1994-03-05T18:19:31.966Z',
            state: 'TO',
        },
        {
            id: 249,
            name: 'Patrícia Lima',
            password: '#Patricia1234',
            email: 'patricia_lima@gmail.com',
            username: 'patricialima',
            birthDate: '1989-08-16T18:19:31.966Z',
            state: 'AC',
        },
        {
            id: 247,
            name: 'Bruno Pereira',
            password: '#Bruno1234',
            email: 'bruno_pereira@gmail.com',
            username: 'brunopereira',
            birthDate: '1981-12-25T18:19:31.966Z',
            state: 'AP',
        },
        {
            id: 246,
            name: 'Fernanda Santos',
            password: '#Fernanda1234',
            email: 'fernanda_santos@gmail.com',
            username: 'fernandasantos',
            birthDate: '1995-09-11T18:19:31.966Z',
            state: 'SE',
        },
        {
            id: 245,
            name: 'Carlos Silva',
            password: '#Carlos1234',
            email: 'carlos_silva@gmail.com',
            username: 'carlossilva',
            birthDate: '1985-05-30T18:19:31.966Z',
            state: 'PB',
        },
    ];

    for (const user of users) {
        const salt = await bcrypt.genSalt();
        const hash: string = await bcrypt.hash(user.password, salt);
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                id_user: user.id,
                email: user.email,
                birthDate: user.birthDate,
                name: user.name,
                password: hash,
                state: user.state as State,
                username: user.username,
            },
        });
    }
    
    const follows = [
        {
            followerId: 158,
            followingId: 188
        },
        {
            followerId: 158,
            followingId: 138
        },
        {
            followerId: 128,
            followingId: 118
        },
        {
            followerId: 158,
            followingId: 252
        },
        {
            followerId: 260,
            followingId: 101
        },
        {
            followerId: 138,
            followingId: 260
        },
        {
            followerId: 252,
            followingId: 128
        },
        {
            followerId: 158,
            followingId: 101
        },
        {
            followerId: 118,
            followingId: 188
        },
        {
            followerId: 260,
            followingId: 259
        },
    ]
    
    for (const follow of follows) {
        await prisma.follows.upsert({
            where: { followerId_followingId: { followerId: follow.followerId, followingId: follow.followingId } },
            update: {},
            create: {
                followerId: follow.followerId,
                followingId: follow.followingId
            },
        });
    }

    const projects = [
        {
            id: 1,
            project_name: 'Projeto A',
            manager_id: 158,
            status: 'Em_Andamento',
            study_area: ['Ciencias_Exatas_e_da_Terra'],
            description: 'Descrição do Projeto A',
            donate: 'www.apoieoprojetoA.com',
            project_role: {
                id_role: 985,
                id_project: 1,
                user_role: 'Biólogo'
            },
            work_type: 'Presencial'
        },
        {
            id: 2,
            project_name: 'Projeto B',
            manager_id: 188,
            status: 'Concluido',
            study_area: ['Ciencias_Exatas_e_da_Terra', 'Ciencias_Sociais'],
            description: 'Descrição do Projeto B',
            donate: 'www.apoieoprojetoB.com',
            project_role: {
                id_role: 986,
                id_project: 2,
                user_role: 'Engenheiro'
            },
            work_type: 'Remoto'
        },
        {
            id: 3,
            project_name: 'Projeto C',
            manager_id: 138,
            status: 'Em_Andamento',
            study_area: ['Ciencias_Biologicas'],
            description: 'Descrição do Projeto C',
            donate: 'www.apoieoprojetoC.com',
            project_role: {
                id_role: 987,
                id_project: 3,
                user_role: 'Químico'
            },
            work_type: 'Presencial'
        },
        {
            id: 4,
            project_name: 'Projeto D',
            manager_id: 111,
            status: 'Em_Desenvolvimento',
            study_area: ['Ciencias_Exatas_e_da_Terra'],
            description: 'Descrição do Projeto D',
            donate: 'www.apoieoprojetoD.com',
            project_role: {
                id_role: 988,
                id_project: 4,
                user_role: 'Físico'
            },
            work_type: 'Presencial'
        },
        {
            id: 5,
            project_name: 'Projeto E',
            manager_id: 259,
            status: 'Em_Andamento',
            study_area: ['Ciencias_da_Saude'],
            description: 'Descrição do Projeto E',
            donate: 'www.apoieoprojetoE.com',
            project_role: {
                id_role: 989,
                id_project: 5,
                user_role: 'Médico'
            },
            work_type: 'Presencial'
        },
        {
            id: 6,
            project_name: 'Projeto F',
            manager_id: 128,
            status: 'Concluido',
            study_area: ['Ciencias_Exatas_e_da_Terra'],
            description: 'Descrição do Projeto F',
            donate: 'www.apoieoprojetoF.com',
            project_role: {
                id_role: 990,
                id_project: 6,
                user_role: 'Matemático'
            },
            work_type: 'Remoto'
        },
        {
            id: 7,
            project_name: 'Projeto G',
            manager_id: 118,
            status: 'Em_Andamento',
            study_area: ['Engenharia_ou_Tecnologia'],
            description: 'Descrição do Projeto G',
            donate: 'www.apoieoprojetoG.com',
            project_role: {
                id_role: 991,
                id_project: 7,
                user_role: 'Desenvolvedor de Software'
            },
            work_type: 'Remoto'
        },
        {
            id: 8,
            project_name: 'Projeto H',
            manager_id: 260,
            status: 'Em_Espera',
            study_area: ['Ciencias_Sociais'],
            description: 'Descrição do Projeto H',
            donate: 'www.apoieoprojetoH.com',
            project_role: {
                id_role: 992,
                id_project: 8,
                user_role: 'Sociólogo'
            },
            work_type: 'Presencial'
        },
        {
            id: 9,
            project_name: 'Projeto I',
            manager_id: 101,
            status: 'Em_Andamento',
            study_area: ['Ciencias_Biologicas'],
            description: 'Descrição do Projeto I',
            donate: 'www.apoieoprojetoI.com',
            project_role: {
                id_role: 993,
                id_project: 9,
                user_role: 'Biologista Marinho'
            },
            work_type: 'Presencial'
        },
        {
            id: 10,
            project_name: 'Projeto J',
            manager_id: 252,
            status: 'Em_Desenvolvimento',
            study_area: ['Ciencias_Exatas_e_da_Terra'],
            description: 'Descrição do Projeto J',
            donate: 'www.apoieoprojetoJ.com',
            project_role: {
                id_role: 994,
                id_project: 10,
                user_role: 'Geólogo'
            },
            work_type: 'Presencial'
        }
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { project_name: project.project_name },
            update: {},
            create: {
                id_project: project.id,
                id_projectManager: project.manager_id,
                status: project.status as StatusProject,
                studyArea: project.study_area as StudyArea[],
                project_name: project.project_name,
                description: project.description,
                donate: project.donate,
                workType: project.work_type as WorkType
            },
        });
        const roles = await prisma.project_role.upsert({
            where: { id_role: project.project_role.id_role },
            update: {},
            create: {
                id_role: project.project_role.id_role,
                id_project: project.project_role.id_project,
                user_role: project.project_role.user_role
            }
        })
    }

    const posts = [
        {
            id_post: 1,
            user_id: 158,
            text: 'Estou fazendo um projeto no Skills',
            img_url: ['www.imgpost1.com/png']
        },
        {
            id_post: 2,
            user_id: 188,
            text: 'Compartilhando meu progresso no novo projeto',
            img_url: ['www.imgpost2.com/jpeg', 'www.imgpost2.com/png']
        },
        {
            id_post: 3,
            user_id: 138,
            text: 'Trabalhando duro para alcançar meus objetivos',
            img_url: ['www.imgpost3.com/jpeg']
        },
        {
            id_post: 4,
            user_id: 111,
            text: 'Uma bela vista do meu local de trabalho hoje',
            img_url: ['www.imgpost4.com/png']
        },
        {
            id_post: 5,
            user_id: 259,
            text: 'Comemorando uma conquista importante',
            img_url: ['www.imgpost5.com/jpeg', 'www.imgpost5.com/png']
        },
        {
            id_post: 6,
            user_id: 260,
            text: 'No meu laboratório, fazendo experimentos incríveis',
            img_url: ['www.imgpost6.com/png']
        },
        {
            id_post: 7,
            user_id: 252,
            text: 'Compartilhando minhas descobertas científicas',
            img_url: ['www.imgpost7.com/jpeg', 'www.imgpost7.com/png']
        },
        {
            id_post: 8,
            user_id: 128,
            text: 'Explorando novas fronteiras da tecnologia',
            img_url: ['www.imgpost8.com/png']
        },
        {
            id_post: 9,
            user_id: 188,
            text: 'Minha jornada na natureza selvagem',
            img_url: ['www.imgpost9.com/jpeg']
        },
        {
            id_post: 10,
            user_id: 101,
            text: 'Celebrando a diversidade e a inclusão',
            img_url: ['www.imgpost10.com/jpeg', 'www.imgpost10.com/png']
        }
    ];
    for (const post of posts) {
        await prisma.post.upsert({
            where: { id_post: post.id_post },
            update: {},
            create: {
                id_post: post.id_post,
                userId: post.user_id,
                text: post.text,
                post_img_url: post.img_url,
            },
        });
    }
    const comments = [
        {
            id_comment: 1,
            id_post: 1,
            id_user: 158,
            message: 'Muito legal o seu post!'
        },
        {
            id_comment: 2,
            id_post: 2,
            id_user: 188,
            message: 'Incrível! Continue assim!'
        },
        {
            id_comment: 3,
            id_post: 3,
            id_user: 138,
            message: 'Seu trabalho é inspirador.'
        },
        {
            id_comment: 4,
            id_post: 4,
            id_user: 111,
            message: 'Adoro essa vista maravilhosa.'
        },
        {
            id_comment: 5,
            id_post: 5,
            id_user: 259,
            message: 'Parabéns pela conquista!'
        },
        {
            id_comment: 6,
            id_post: 6,
            id_user: 260,
            message: 'Seus experimentos são fascinantes.'
        },
        {
            id_comment: 7,
            id_post: 7,
            id_user: 252,
            message: 'Suas descobertas são importantes.'
        },
        {
            id_comment: 8,
            id_post: 8,
            id_user: 128,
            message: 'Tecnologia de ponta!'
        },
        {
            id_comment: 9,
            id_post: 9,
            id_user: 118,
            message: 'Natureza selvagem é incrível.'
        },
        {
            id_comment: 10,
            id_post: 10,
            id_user: 101,
            message: 'Diversidade é fundamental.'
        }
    ];

    for (const comment of comments) {
        await prisma.comment.upsert({
            where: { id_comment: comment.id_comment },
            update: {},
            create: {
                id_comment: comment.id_comment,
                idPost: comment.id_post,
                userId: comment.id_user,
                message: comment.message
            },
        });
    }

    const institutions = [
        {
            id_institution: 1,
            institution_name: "Udemy",
            institutions_type: "Plataforma Online de Cursos"
        },
        {
            id_institution: 2,
            institution_name: "UFSC",
            institutions_type: "Plataforma de Ensino Online"
        },
        {
            id_institution: 3,
            institution_name: "USP",
            institutions_type: "Plataforma de Educação a Distância"
        },
        {
            id_institution: 4,
            institution_name: "FGV",
            institutions_type: "Plataforma de Aprendizado Gratuito"
        },
        {
            id_institution: 5,
            institution_name: "LinkedIn Learning",
            institutions_type: "Plataforma de Desenvolvimento Profissional"
        },
        {
            id_institution: 6,
            institution_name: "Codecademy",
            institutions_type: "Plataforma de Aprendizado de Programação"
        },
        {
            id_institution: 7,
            institution_name: "Treehouse",
            institutions_type: "Plataforma de Cursos de Tecnologia"
        },
        {
            id_institution: 8,
            institution_name: "Skillshare",
            institutions_type: "Plataforma de Aprendizado Criativo"
        },
        {
            id_institution: 9,
            institution_name: "Pluralsight",
            institutions_type: "Plataforma de Desenvolvimento de Habilidades Tecnológicas"
        },
        {
            id_institution: 10,
            institution_name: "LinkedIn",
            institutions_type: "Rede Profissional e de Carreira"
        }
    ]

    for (const institution of institutions) {
        await prisma.institution.upsert({
            where: { id_institution: institution.id_institution },
            update: {},
            create: {
                id_institution: institution.id_institution,
                institution_name: institution.institution_name,
                institutions_type: institution.institutions_type,

            },
        });
    }

    const experiences = [
        {
            id: 1,
            id_user: 158,
            id_institution: 1,
            studyArea: ['Ciencias_Humanas'],
            role: 'Advogado',
            endDate: '2003-09-21T18:19:31.966Z',
            description: 'Advogado Trabalhista, participei de 48 causas durante minha carreira.'
        },
        {
            id: 2,
            id_user: 188,
            id_institution: 2,
            studyArea: ['Ciencias_Humanas'],
            role: 'Psicólogo',
            endDate: '2010-05-15T10:30:00.000Z',
            description: 'Trabalhei como psicólogo clínico por 10 anos, ajudando pacientes com diversos desafios emocionais.'
        },
        {
            id: 3,
            id_user: 138,
            id_institution: 3,
            studyArea: ['Ciencias_Exatas_e_da_Terra'],
            role: 'Engenheiro Civil',
            endDate: '2015-12-05T16:45:00.000Z',
            description: 'Gerenciei projetos de construção civil em várias cidades e supervisionei equipes de engenheiros.'
        },
        {
            id: 4,
            id_user: 111,
            id_institution: 4,
            studyArea: ['Ciencias_Exatas_e_da_Terra'],
            role: 'Geólogo',
            endDate: '2011-08-10T08:00:00.000Z',
            description: 'Realizei pesquisas geológicas em áreas de risco e contribuí para estudos de mitigação de desastres.'
        },
        {
            id: 5,
            id_user: 259,
            id_institution: 5,
            studyArea: ['Ciencias_da_Saude'],
            role: 'Médico Cirurgião',
            endDate: '2022-04-30T14:15:00.000Z',
            description: 'Realizei centenas de cirurgias e atendi pacientes em hospitais renomados.'
        },
        {
            id: 6,
            id_user: 260,
            id_institution: 6,
            studyArea: ['Ciencias_da_Saude'],
            role: 'Enfermeiro',
            endDate: '2018-11-27T12:00:00.000Z',
            description: 'Trabalhei em unidades de terapia intensiva e cuidei de pacientes em estado crítico.'
        },
        {
            id: 7,
            id_user: 252,
            id_institution: 7,
            studyArea: ['Engenharia_ou_Tecnologia'],
            role: 'Desenvolvedor de Software',
            endDate: '2021-06-20T15:30:00.000Z',
            description: 'Desenvolvi aplicativos e sistemas para empresas de tecnologia de ponta.'
        },
        {
            id: 8,
            id_user: 128,
            id_institution: 8,
            studyArea: ['Engenharia_ou_Tecnologia'],
            role: 'Cientista de Dados',
            endDate: '2019-02-14T09:45:00.000Z',
            description: 'Analisando grandes conjuntos de dados para insights valiosos e tomada de decisões estratégicas.'
        },
        {
            id: 9,
            id_user: 118,
            id_institution: 9,
            studyArea: ['Ciencias_Biologicas'],
            role: 'Biólogo Marinho',
            endDate: '2014-07-03T11:10:00.000Z',
            description: 'Conduzi expedições de pesquisa marinha e estudei a biodiversidade dos oceanos.'
        },
        {
            id: 10,
            id_user: 101,
            id_institution: 10,
            studyArea: ['Ciencias_Biologicas'],
            role: 'Geneticista',
            endDate: '2017-10-12T13:20:00.000Z',
            description: 'Pesquisei genética molecular e participei de projetos de sequenciamento de DNA.'
        }
    ];
    

    for (const experience of experiences) {
        await prisma.experience.upsert({
            where: { id_experience: experience.id },
            update: {},
            create: {
                id_experience: experience.id,
                userId: experience.id_user,
                institutionId: experience.id_institution,
                studyArea: experience.studyArea as StudyArea[],
                role: experience.role,
                endDate: experience.endDate,
                description: experience.description
            },
        });
    }

    const certificates = [
        {
            id_certificate: 1,
            id_user: 128,
            institutionId: 1,
            certificate_name: 'Curso Python 3 Zero to Hero',
            beginDate: '2019-05-21T18:19:31.966Z',
            endDate: '2020-05-10T09:29:31.966Z',
            url: 'www.udemy.com/213',
        },
        {
            id_certificate: 2,
            id_user: 158,
            institutionId: 2,
            certificate_name: 'Web Development Fundamentals',
            beginDate: '2018-11-15T14:45:00.000Z',
            endDate: '2019-12-30T10:10:00.000Z',
            url: 'www.example.com/cert-2',
        },
        
        {
            id_certificate: 3,
            id_user: 188,
        institutionId: 3,
        certificate_name: 'Data Science for Beginners',
        beginDate: '2020-03-02T09:30:00.000Z',
        endDate: '2021-02-14T17:45:00.000Z',
        url: 'www.example.com/cert-3',
    },
    {
        id_certificate: 4,
        id_user: 138,
        institutionId: 4,
        certificate_name: 'JavaScript Advanced Programming',
        beginDate: '2019-08-10T13:15:00.000Z',
        endDate: '2020-09-25T16:30:00.000Z',
        url: 'www.example.com/cert-4',
    },
    {
            id_certificate: 5,
            id_user: 111,
            institutionId: 5,
            certificate_name: 'Machine Learning Essentials',
            beginDate: '2020-06-05T11:20:00.000Z',
            endDate: '2021-07-18T08:55:00.000Z',
            url: 'www.example.com/cert-5',
        },
        {
            id_certificate: 6,
            id_user: 259,
            institutionId: 6,
            certificate_name: 'Mobile App Development Basics',
            beginDate: '2019-12-01T08:00:00.000Z',
            endDate: '2021-01-22T12:40:00.000Z',
            url: 'www.example.com/cert-6',
        },
        {
            id_certificate: 7,
            id_user: 260,
            institutionId: 7,
            certificate_name: 'Front-end Web Design Mastery',
            beginDate: '2018-07-20T17:30:00.000Z',
            endDate: '2019-08-09T14:25:00.000Z',
            url: 'www.example.com/cert-7',
        },
        {
            id_certificate: 8,
            id_user: 252,
            institutionId: 8,
            certificate_name: 'Cybersecurity Fundamentals',
            beginDate: '2021-01-05T09:00:00.000Z',
            endDate: '2022-02-20T15:10:00.000Z',
            url: 'www.example.com/cert-8',
        },
        {
            id_certificate: 9,
            id_user: 101,
            institutionId: 9,
            certificate_name: 'Artificial Intelligence Ethics',
            beginDate: '2019-09-15T10:55:00.000Z',
            endDate: '2020-11-30T11:30:00.000Z',
            url: 'www.example.com/cert-9',
        },
        {
            id_certificate: 10,
            id_user: 118,
            institutionId: 10,
            certificate_name: 'Software Engineering Principles',
            beginDate: '2020-04-10T14:00:00.000Z',
            endDate: '2021-05-22T16:15:00.000Z',
            url: 'www.example.com/cert-10',
        }
    ]

    for (const certificate of certificates) {
        await prisma.certificates.upsert({
            where: { id_certificate: certificate.id_certificate },
            update: {},
            create: {
                id_certificate: certificate.id_certificate,
                id_user: certificate.id_user,
                institutionId: certificate.institutionId,
                certificate_name: certificate.certificate_name,
                beginDate: certificate.beginDate,
                endDate: certificate.endDate,
                url: certificate.url,
            },
        });
    }


    const formations = [
        {
            id_formation: 1,
            degree: 'Engenharia de Produção',
            studyArea: ['Engenharia_ou_Tecnologia'],
            beginDate: '2016-04-10T14:00:00.000Z',
            endDate: '2020-04-10T14:00:00.000Z',
            description: 'Graduação na UFSC',
            userid: 158,
            institutionId: 2
        },
        {
            id_formation: 2,
            degree: 'Engenharia Elétrica',
            studyArea: ['Engenharia_ou_Tecnologia'],
            beginDate: '2015-09-01T08:30:00.000Z',
            endDate: '2019-06-15T16:45:00.000Z',
            description: 'Bacharelado na USP',
            userid: 138,
            institutionId: 3
        },
        {
            id_formation: 3,
            degree: 'Artes Plásticas',
            studyArea: ['Letras_e_Artes'],
            beginDate: '2014-02-20T13:15:00.000Z',
            endDate: '2018-03-05T11:20:00.000Z',
            description: 'Curso de Graduação na UNICAMP',
            userid: 111,
            institutionId: 1
        },
        {
            id_formation: 4,
            degree: 'Administração de Empresas',
            studyArea: ['Ciencias_Humanas'],
            beginDate: '2017-07-10T09:00:00.000Z',
            endDate: '2021-06-30T17:30:00.000Z',
            description: 'Graduação na FGV',
            userid: 188,
            institutionId: 4
        },
        {
            id_formation: 5,
            degree: 'Medicina',
            studyArea: ['Ciencias_da_Saude'],
            beginDate: '2016-01-15T08:45:00.000Z',
            endDate: '2022-12-20T15:00:00.000Z',
            description: 'Formação médica na UFRJ',
            userid: 259,
            institutionId: 5
        },
        {
            id_formation: 6,
            degree: 'Psicologia',
            studyArea: ['Ciencias_Humanas'],
            beginDate: '2015-03-05T14:30:00.000Z',
            endDate: '2019-05-10T12:10:00.000Z',
            description: 'Graduação em Psicologia na UFMG',
            userid: 260,
            institutionId: 6
        },
        {
            id_formation: 7,
            degree: 'Biologia Marinha',
            studyArea: ['Ciencias_Biologicas'],
            beginDate: '2018-08-01T10:20:00.000Z',
            endDate: '2022-07-15T16:55:00.000Z',
            description: 'Formação em Biologia Marinha na UFRN',
            userid: 128,
            institutionId: 7
        },
        {
            id_formation: 8,
            degree: 'Direito',
            studyArea: ['Ciencias_Humanas'],
            beginDate: '2017-09-20T09:15:00.000Z',
            endDate: '2021-12-05T13:40:00.000Z',
            description: 'Curso de Direito na PUC-SP',
            userid: 252,
            institutionId: 8
        },
        {
            id_formation: 9,
            degree: 'Engenharia Civil',
            studyArea: ['Engenharia_ou_Tecnologia'],
            beginDate: '2016-06-30T11:55:00.000Z',
            endDate: '2020-07-25T14:25:00.000Z',
            description: 'Bacharelado em Engenharia Civil na UnB',
            userid: 101,
            institutionId: 9
        },
        {
            id_formation: 10,
            degree: 'Economia',
            studyArea: ['Ciencias_Exatas_e_da_Terra'],
            beginDate: '2015-05-12T14:45:00.000Z',
            endDate: '2019-04-10T10:30:00.000Z',
            description: 'Curso de Economia na USP',
            userid: 118,
            institutionId: 10
        }
    ]

    for (const formation of formations) {
        await prisma.formation.upsert({
            where: { id_formation: formation.id_formation },
            update: {},
            create: {
                id_formation: formation.id_formation,
                degree: formation.degree,
                studyArea: formation.studyArea as StudyArea[],
                beginDate: formation.beginDate,
                endDate: formation.endDate,
                description: formation.description,
                userId: formation.userid,
                institutionId: formation.institutionId
          },
        });
    }
//158 - 188 - 138 - 111 - 259 - 260 - 252 - 128 - 118 - 101

    const screen_Curtidas = [
      {
        id_stick: 1,
        id_candidate: 158,
        id_role: 985,
        likeAuthor: 'Owner',
      },
      {
        id_stick: 2,
        id_candidate: 188,
        id_role: 986,
        likeAuthor: 'Owner',
      },
      {
        id_stick: 3,
        id_candidate: 111,
        id_role: 987,
        likeAuthor: 'Candidate',
      },
      {
        id_stick: 4,
        id_candidate: 260,
        id_role: 988,
        likeAuthor: 'Candidate',
      },
      {
        id_stick: 5,
        id_candidate: 252,
        id_role: 989,
        likeAuthor: 'Candidate',
      },
      {
        id_stick: 6,
        id_candidate: 128,
        id_role: 990,
        likeAuthor: 'Owner',
      },
      {
        id_stick: 7,
        id_candidate: 118,
        id_role: 991,
        likeAuthor: 'Owner',
      },
      {
        id_stick: 8,
        id_candidate: 101,
        id_role: 992,
        likeAuthor: 'Candidate',
      },
      {
        id_stick: 9,
        id_candidate: 259,
        id_role: 993,
        likeAuthor: 'Candidate',
      },
      {
        id_stick: 10,
        id_candidate: 138,
        id_role: 994,
        likeAuthor: 'Candidate',
      }
    ]

    for (const screen_Curtida of screen_Curtidas) {
      await prisma.screen_Curtidas.upsert({
          where: { id_stick: screen_Curtida.id_stick },
          update: {},
          create: {
              id_stick: screen_Curtida.id_stick,
              id_candidate: screen_Curtida.id_candidate,
              id_role: screen_Curtida.id_role,
              likeAuthor: screen_Curtida.likeAuthor as LikeAuthor
        },
      });
  }


}



// execute the main function
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });