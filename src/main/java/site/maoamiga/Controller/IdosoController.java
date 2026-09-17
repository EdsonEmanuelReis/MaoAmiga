package site.maoamiga.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.maoamiga.Model.Idoso;
import site.maoamiga.Service.IdosoService;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/idoso")

public class IdosoController {

    private final IdosoService idosoService;

    @PostMapping("/cadastrarIdoso")
    public ResponseEntity<String> cadastrarIdoso (@RequestBody Idoso idoso){
        if(!idosoService.cadastrarIdoso(idoso)){
            return ResponseEntity.badRequest().body("Não foi possivel cadastrar idoso.");
        }
        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }

    @GetMapping("/buscarIdosoPorId")
    public ResponseEntity<Idoso> buscarIdoso (@RequestParam Integer id) {
        Idoso idoso = idosoService.buscarIdIdoso(id);

        if (idoso == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(idoso);
    }

    @GetMapping("/listarIdoso")
    public ResponseEntity<List<Idoso>> listarIdoso  (){
        return ResponseEntity.ok(idosoService.listarIdoso());
    }

    @DeleteMapping ("/deletarIdoso")
    public ResponseEntity<Void> deletarIdoso (@RequestParam Integer id){
        if (!idosoService.excluirIdoso(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizarIdoso")
    public ResponseEntity<Void> atualizarIdoso (
            @RequestParam Integer id,
            @RequestBody Idoso atualizado){

        if (!idosoService.atualizarIdoso(id,atualizado)){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();

    }

}
