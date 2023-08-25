<?php
namespace App\Controller;
use App\Entity\Notes;
use App\Repository\NotesRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
// use Doctrine\ORM\Mapping\Id;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class NotesController extends AbstractController
{
    
    #[Route("/newNote" , name:'app_note' )]
    public function NewNote (Request $request ,EntityManagerInterface $entityManager,UserRepository $userRepo) : jsonResponse
    {
        $user = $this->getUser();
        $data= json_decode($request -> getContent(),true);
        $user= $userRepo->find($data['userId']);
        $date=new \DateTime(($data['creationDate']));
        // $encoders = [new JsonEncoder()];
        // $normalizers = [new DateTimeNormalizer()];
        // $serializer = new Serializer([new DateTimeNormalizer()], [new JsonEncoder()]);
        // $date = $serializer->denormalize($date, \DateTimeInterface::class);


        $newNote= new Notes();
        $newNote -> setTitle($data['title']);
        $newNote -> setContent($data['content']);
        $newNote -> setCreationDate($date);
        $newNote -> setUser($user);

        $entityManager->persist($newNote);
        $entityManager->flush();
        $latestId = $newNote->getId();

        return $this->json(['message' => 'Data saved successfully', "id" =>$latestId]);

    }

    #[Route("/getNotes" , name:'get_notes' , methods:"GET" )]

    public function GetNotes (UserRepository $userRepository) :JsonResponse
    {
        $user= $this -> getUser();
        $user = $userRepository -> findConnectedUser($user->getUserIdentifier());
        $notes = $user -> getNotes();
        $formattedNotes = [];
    foreach ($notes as $note) {
        $creationDate= $note -> getCreationDate();
        $formattedDate = $creationDate->format('Y-m-d\TH:i:s.u\Z');
        $formattedNotes[] = [
            'id' => $note->getId(),
            'title' => $note->getTitle(),
            'content' => $note->getContent(),
            'creationDate' => $formattedDate,
        ];
    } 
    return $this->json(['notes' => $formattedNotes]);
    }

    #[Route("/deleteNotes" , name:'delete_notes' )]

    public function deleteNotes(Request $request, NotesRepository $notesRepository, UserRepository $userRepository , EntityManagerInterface $entityManager) :JsonResponse
{   
    
    $delNotes=json_decode($request->getContent(), true)['delNotes'];
    $user= $this -> getUser();
    $user = $userRepository -> findConnectedUser($user->getUserIdentifier());
    foreach ($delNotes as $note) {
        $note = $notesRepository->find($note["id"]);
            $user -> removeNote($note);
            };
        $entityManager->persist($user);
        $entityManager->flush();

    return new JsonResponse(['message' => 'Notes deleted successfully']);
}

}