package site.maoamiga.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="idoso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Idoso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "idade", nullable = false)
    private Integer idade;

    @Column(name = "cpf", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name = "telefone", nullable = false, length = 15)
    private String telefone;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "contato_emergencia", nullable = false, length = 100)
    private String contatoEmergencia;

    @Column(name = "telefone_emergencia", nullable = false, length = 15)
    private String telefoneEmergencia;

    @Column(name = "necessita_acessibilidade", nullable = false)
    private Boolean necessitaAcessibilidade = true;

    @Column(name = "tamanho_fonte", nullable = false)
    private Integer tamanhoFonte = 16;

    @Column(name = "id_responsavel", nullable = false)
    private Integer idResponsavel;

}
