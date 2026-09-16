package site.maoamiga.Model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="responsavel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Responsavel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "cpf", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name = "telefone", nullable = false, length = 15)
    private String telefone;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "tipo_vinculo", nullable = false, length = 50)
    private String tipo_vinculo;
}
